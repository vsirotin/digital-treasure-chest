import { Command } from 'commander';
import { FileProcessor } from './splitter';
import { version } from './version-info';


const program = new Command();
console.log('-----Start-------');
program
  .version(version, '-v, --version', 'output the current version')
  .option('-f, --file <path>', 'path to a single file with multiple language-specific JSON objects')
  .option('-o, --output-dir <path>', 'path to directory for generated files')
  .option('-l, --list <path>', 'path to file with language codes (optional)')
  .action((options) => {
    console.log(' Options:', options);
    if (!options.file || !options.outputDir) {
      console.log(`
An application checks a single file with multiple language-specific JSON objects and writes their content in separate JSON files. Optionally, it checks also the completeness of a single file.
Parameters:
--file: a path to a single file with multiple language-specific JSON objects,
--output-dir: a path to directory for generated files. If it doesn't exist, the application will try to create it. The files in the directory will be overwritten.
--list: a path to file with language codes (optional).

A single file with multiple language-specific JSON objects should have the following format:
<lang-code 1>
<json-object 1>
<lang-code 2>
<json-object 2>
...
<lang-code N>
<json-object N>

For example:
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

A file with language codes should have the following format:
en-US
de-DE

The application will create in the output directory two files:
en-US.json with content:
{
    "greeting": "Hello",
    "talk": "How are you?"
}
and de-DE.json with content:
{
    "greeting": "Hi!",
    "talk": "Wie geht es dir?"
}
      `);
    } else {
      const processor = new FileProcessor(options.list);
      processor.processFile(options.file, options.outputDir);
    }
  })
  .parse(process.argv);