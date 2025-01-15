import * as fs from 'fs';
import * as path from 'path';
import { FileProcessor } from './file-processor';

describe('FileProcessor', () => {
  const testDir = path.join(__dirname, 'test-output');
  const inputFilePath = path.join(__dirname, 'test-input.txt');
  const listFilePath = path.join(__dirname, 'test-list.txt');

  beforeAll(() => {
    // Create test input file
    const inputContent = `
en-US
{
  "greeting": "Hello",
  "talk": "How are you?"
}
de-DE
{
  "greeting": "Hi!",
  "talk": "Wie geht es dir?"
}
    `;
    fs.writeFileSync(inputFilePath, inputContent.trim(), 'utf-8');

    // Create test list file
    const listContent = `
en-US
de-DE
    `;
    fs.writeFileSync(listFilePath, listContent.trim(), 'utf-8');
  });

  afterAll(() => {
    // Clean up test files
    fs.unlinkSync(inputFilePath);
    fs.unlinkSync(listFilePath);
    fs.rmdirSync(testDir, { recursive: true });
  });

  it('should process the input file and create separate JSON files', () => {
    const processor = new FileProcessor(listFilePath);
    processor.processFile(inputFilePath, testDir);

    const enUSFilePath = path.join(testDir, 'en-US.json');
    const deDEFilePath = path.join(testDir, 'de-DE.json');

    expect(fs.existsSync(enUSFilePath)).toBe(true);
    expect(fs.existsSync(deDEFilePath)).toBe(true);

    const enUSContent = fs.readFileSync(enUSFilePath, 'utf-8');
    const deDEContent = fs.readFileSync(deDEFilePath, 'utf-8');

    expect(enUSContent).toBe(`{
  "greeting": "Hello",
  "talk": "How are you?"
}`);
    expect(deDEContent).toBe(`{
  "greeting": "Hi!",
  "talk": "Wie geht es dir?"
}`);
  });
});