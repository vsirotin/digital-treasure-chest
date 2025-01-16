import * as fs from 'fs';
import * as path from 'path';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';


export class FileProcessor {
  private listPath?: string;
  private logger: ILogger = LoggerFactory.getLogger('FileProcessor');
  private mapLangToObject = new Map<string, Object>();
  private exampleObject? : Object

  constructor(listPath?: string) {
    this.logger.setLogLevel(1);
    this.logger.log('FileProcessor created. List path:', listPath);
    this.listPath = listPath;
  }

  public processFile(filePath: string, outputDir: string): void {
    if (!this.alyseSyntax(filePath)) {
      this.logger.error('ERROR 100: Syntax analysis failed.');
      return;
    }

    if (this.listPath && !this.compareLanguageCodes()) {
      this.logger.error('ERROR 200: Language code comparison failed.');
      return;
    }

    this.writeOutputFiles(outputDir);
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
  let braceLevel = 0;
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
      if (braceLevel > 0) {
        this.logger.error(`ERROR 1: Unexpected language code at line ${lineNumber} while parsing object.`);
        return false;
      }
      currentLangCode = trimmedLine;
      continue;
    }

    // Start of processing lines of JSON object
    if (trimmedLine.startsWith('{')) {
      braceLevel++;
      currentObjectLines.push(trimmedLine);
      continue;
    }

    let hasStartBrace = trimmedLine.includes('{');
    let hasEndBrace = trimmedLine.includes('}');

    if(hasStartBrace && hasEndBrace){
      currentObjectLines.push(trimmedLine);
      continue
    }

    if(hasStartBrace && !hasEndBrace){
      braceLevel++;
      currentObjectLines.push(trimmedLine);
      continue;
    }

    // Check if the line ends an object
    if (hasEndBrace) {

      if(braceLevel <= 0) {
        this.logger.error(`ERROR 2: Unexpected '}' at line ${lineNumber} without starting an object.`);
        return false;
      }
      braceLevel--;
      currentObjectLines.push(trimmedLine);

      if (braceLevel > 0) {
        continue;
      }


      // Parse the object
      try {
        this.logger.debug(`Parsing object after processing of a line ${lineNumber}: currentObjectLines: ${currentObjectLines}`);
        const currentObject = JSON.parse(currentObjectLines.join('\n'));

        // Save the first correct object as exampleObject
        if (!this.exampleObject) {
          this.exampleObject = currentObject;
        } else {
          // Compare the structure of the current object with exampleObject
          if (JSON.stringify(Object.keys(currentObject)) !== JSON.stringify(Object.keys(this.exampleObject))) {
            this.logger.error(`ERROR 3: Object structure mismatch at line ${lineNumber}.`);
            return false;
          }
        }

        // Save the correct pair in mapLangToObject
        this.mapLangToObject.set(currentLangCode, currentObject);
      } catch (error) {
        this.logger.error(`ERROR 4:  Failed to parse object at line ${lineNumber}: Error ${error}`);
        return false;
      }

      // Reset for the next object
      currentLangCode = '';
      currentObjectLines = [];
      braceLevel = 0;
      continue;
    }

    // Collect lines inside an object
    if (braceLevel > 0) {
      currentObjectLines.push(trimmedLine);
    } else {
      this.logger.error(`ERROR 5: Unexpected line at ${lineNumber}: ${trimmedLine}`);
      return false;
    }
  }

  

  // Log the result of processing
  this.logger.log(`Processed ${lineNumber} lines and found ${this.mapLangToObject.size} objects.`);

  return true;
}

/**
 * Compares language-codes found in the input file with those from the list file.
 * 
 * If listPath is set, it reads its lines and tries to find language-codes. If the file does not exist or its content is not correct, the program writes an error message to the logger.
 * If successful, it compares the list of language-codes from the file and those found in the input file.
 */ 
  compareLanguageCodes(): boolean {
    // If listPath is set, read and validate language codes from the list file
  if (this.listPath) {
    try {
      const listFileContent = fs.readFileSync(this.listPath, 'utf-8');
      const listLines = listFileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

      for (const code of listLines) {
        if (!this.mapLangToObject.has(code)) {
          this.logger.error(`ERROR 10: Language code ${code} from list file not found in the input file.`);
          return false;
        }
      }
    } catch (error) {
      this.logger.error(`ERROR 11: Failed to read or parse list file: ${this.listPath}`);
      return false;
    }
  }

    return true;
  }

  /**
   * Writes the objects from collected map into the output files.
   * Each object is written into a separate file named as language-code.json.
   */
  writeOutputFiles(outputDir: string): void {
    this.logger.log(`Start of writing ${this.mapLangToObject.size} output files to ${outputDir}.`);
    for (const [langCode, object] of this.mapLangToObject) {
      const outputFilePath = path.join(outputDir, `${langCode}.json`);
      fs.writeFileSync(outputFilePath, JSON.stringify(object, null, 2));
    }
    this.logger.log('All output files have been written.');
  }
}