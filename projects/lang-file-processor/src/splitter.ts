import * as fs from 'fs';
import * as path from 'path';

/**
 * Splits a single file with multiple language-specific JSON objects into separate JSON files.
 * @param filePath - Path to the input file with multiple language-specific JSON objects.
 * @param outputDir - Path to the directory for generated files.
 * @param listPath - Optional path to the file with language codes.
 */
export function splitFile(filePath: string, outputDir: string, listPath?: string): void {
  // Read the input file
  const inputFileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = inputFileContent.split('\n');

  // Read the language codes if listPath is provided
  let languageCodes: string[] = [];
  if (listPath) {
    const listFileContent = fs.readFileSync(listPath, 'utf-8');
    languageCodes = listFileContent.split('\n').map(line => line.trim()).filter(line => line);
    console.log("languageCodes found:", languageCodes);
  }else{
    console.log("No languageCodes found");
  }

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    console.log("Creating output directory:", outputDir);
    fs.mkdirSync(outputDir, { recursive: true });
  }else
  {
    console.log("Output directory already exists:", outputDir);
  }

  // Process the input file and write separate JSON files
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
        console.log("Writing file:", outputFilePath, "with content:", currentJsonObject);
      }
      currentLangCode = '';
      currentJsonObject = '';
    } else {
      currentLangCode = line.trim();
      currentJsonObject = '';
    }
  }
}