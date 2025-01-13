import * as fs from 'fs';
import * as path from 'path';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

const logger = LoggerFactory.getLogger('FileProcessor');

export class FileProcessor {
  private listPath?: string;

  constructor(listPath?: string) {
    logger.setLogLevel(0);
    logger.log('FileProcessor created. List path:', listPath);
    this.listPath = listPath;
  }

  public processFile(filePath: string, outputDir: string): void {
    if (!this.syntaxAnalysis(filePath)) {
      logger.error('Syntax analysis failed.');
      return;
    }

    if (this.listPath && !this.compareLanguageCodes(filePath)) {
      logger.error('Language code comparison failed.');
      return;
    }

    this.splitFile(filePath, outputDir);
  }

  private syntaxAnalysis(filePath: string): boolean {
    // Dummy implementation for syntax analysis
    logger.log('Performing syntax analysis...');
    // TODO: Implement actual syntax analysis
    return true;
  }

  private compareLanguageCodes(filePath: string): boolean {
    logger.log('Comparing language codes...');
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
        logger.error(`Language code ${code} not found in the input file.`);
        return false;
      }
    }

    return true;
  }

  private splitFile(filePath: string, outputDir: string): void {
    logger.log('Splitting file...');
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