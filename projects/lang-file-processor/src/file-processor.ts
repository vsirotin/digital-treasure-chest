import * as fs from 'fs';
import * as path from 'path';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';


export class FileProcessor {
  private listPath?: string;
  private logger: ILogger = LoggerFactory.getLogger('FileProcessor');
  private mapLangToObject = new Map<string, Object>();
  private exampleObject? : Object

  constructor(listPath?: string) {
    this.logger.setLogLevel(0);
    this.logger.log('FileProcessor created. List path:', listPath);
    this.listPath = listPath;
  }

  public processFile(filePath: string, outputDir: string): void {
    if (!this.alyseSyntax(filePath)) {
      this.logger.error('Syntax analysis failed.');
      return;
    }

    if (this.listPath && !this.compareLanguageCodes(filePath)) {
      this.logger.error('Language code comparison failed.');
      return;
    }

    this.splitFile(filePath, outputDir);
  }

/**
 * Analyzes the syntax of the input file.
 * 
 * The function reads lines from the input file sequentially.
 * It skips empty strings.
 * It tries to find a group of lines that represent a pair:
 * - language-code (one line)
 * - object (many lines starting with "{" and ending with "}").
 * 
 * A language code has a structure ab-CD where a and b are lowercase letters and C and D are uppercase letters.
 * The first correct object will be saved in exampleObject.
 * The structure of the second and following objects will be compared with exampleObject.
 * All correct pairs will be saved in the mapLangToObject, where the key is a language-code and the value is an object.
 * 
 * If listPath is set, it reads its lines and tries to find language-codes. If the file does not exist or its content is not correct, the program writes an error message to the logger.
 * If successful, it compares the list of language-codes from the file and those found in the input file.
 * 
 * If the program finds some error, it writes a corresponding message to the logger, including the number of lines with errors in the input file, and cancels processing.
 * Otherwise, it logs the result of processing (the number of processed lines and found objects).
 * 
 * @param inputFilePath - The path to the input file.
 */
alyseSyntax(inputFilePath: string): boolean {
  const inputFileContent = fs.readFileSync(inputFilePath, 'utf-8');
  const lines = inputFileContent.split('\n');

  let currentLangCode = '';
  let currentObjectLines: string[] = [];
  let insideObject = false;
  let lineNumber = 0;

  for (const line of lines) {
    lineNumber++;
    const trimmedLine = line.trim();

    // Skip empty lines
    if (trimmedLine === '') {
      continue;
    }

    // Check if the line is a language code
    if (/^[a-z]{2}-[A-Z]{2}$/.test(trimmedLine)) {
      if (insideObject) {
        this.logger.error(`Unexpected language code at line ${lineNumber} while parsing object.`);
        return false;
      }
      currentLangCode = trimmedLine;
      continue;
    }

    // Check if the line starts an object
    if (trimmedLine.startsWith('{')) {
      if (insideObject) {
        this.logger.error(`Unexpected '{' at line ${lineNumber} while already inside an object.`);
        return false;
      }
      insideObject = true;
      currentObjectLines.push(trimmedLine);
      continue;
    }

    // Check if the line ends an object
    if (trimmedLine.endsWith('}')) {
      if (!insideObject) {
        this.logger.error(`Unexpected '}' at line ${lineNumber} without starting an object.`);
        return false;
      }
      currentObjectLines.push(trimmedLine);
      insideObject = false;

      // Parse the object
      try {
        const currentObject = JSON.parse(currentObjectLines.join('\n'));

        // Save the first correct object as exampleObject
        if (!this.exampleObject) {
          this.exampleObject = currentObject;
        } else {
          // Compare the structure of the current object with exampleObject
          if (JSON.stringify(Object.keys(currentObject)) !== JSON.stringify(Object.keys(this.exampleObject))) {
            this.logger.error(`Object structure mismatch at line ${lineNumber}.`);
            return false;
          }
        }

        // Save the correct pair in mapLangToObject
        this.mapLangToObject.set(currentLangCode, currentObject);
      } catch (error) {
        this.logger.error(`Failed to parse object at line ${lineNumber}: Error ${error}`);
        return false;
      }

      // Reset for the next object
      currentLangCode = '';
      currentObjectLines = [];
      continue;
    }

    // Collect lines inside an object
    if (insideObject) {
      currentObjectLines.push(trimmedLine);
    } else {
      this.logger.error(`Unexpected line at ${lineNumber}: ${trimmedLine}`);
      return false;
    }
  }

  // If listPath is set, read and validate language codes from the list file
  if (this.listPath) {
    try {
      const listFileContent = fs.readFileSync(this.listPath, 'utf-8');
      const listLines = listFileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

      for (const code of listLines) {
        if (!this.mapLangToObject.has(code)) {
          this.logger.error(`Language code ${code} from list file not found in the input file.`);
          return false;
        }
      }
    } catch (error) {
      this.logger.error(`Failed to read or parse list file: ${this.listPath}`);
      return false;
    }
  }

  // Log the result of processing
  this.logger.log(`Processed ${lineNumber} lines and found ${this.mapLangToObject.size} objects.`);

  return true;
}

  private compareLanguageCodes(filePath: string): boolean {
    this.logger.log('Comparing language codes...');
    const inputFileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = inputFileContent.split('\n');

    const listFileContent = fs.readFileSync(this.listPath!, 'utf-8');
    const languageCodes = listFileContent.split('\n').map(line => line.trim()).filter(line => line);

    const extractedCodes = new Set<string>();
    for (const line of lines) {
      if (!line.trim().startsWith('{') && !line.trim().endsWith('}')) {
        extractedCodes.add(line.trim());
      }
    }

    for (const code of languageCodes) {
      if (!extractedCodes.has(code)) {
        this.logger.error(`Language code ${code} not found in the input file.`);
        return false;
      }
    }

    return true;
  }

  private splitFile(filePath: string, outputDir: string): void {
    this.logger.log('Splitting file...');
    const inputFileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = inputFileContent.split('\n');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let currentLangCode = '';
    let currentJsonObject = '';
    for (const line of lines) {
      if (line.trim().startsWith('{')) {
        currentJsonObject += line + '\n';
      } else if (line.trim().endsWith('}')) {
        currentJsonObject += line + '\n';
        if (currentLangCode) {
          const outputFilePath = path.join(outputDir, `${currentLangCode}.json`);
          fs.writeFileSync(outputFilePath, currentJsonObject, 'utf-8');
        }
        currentLangCode = '';
        currentJsonObject = '';
      } else {
        currentLangCode = line.trim();
        currentJsonObject = '';
      }
    }
  }
}