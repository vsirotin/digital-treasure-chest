const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the version.json file
const versionFilePath = path.join(__dirname + "/projects/main-app/src/", 'version.json');

// Update the build date in version.json
const updateBuildDate = () => {
  const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const versionContent = fs.readFileSync(versionFilePath, 'utf-8');
  const versionJson = JSON.parse(versionContent);
  versionJson.buildDate = currentDate;
  fs.writeFileSync(versionFilePath, JSON.stringify(versionJson, null, 2));
  console.log(`Updated build date to ${currentDate}`);
};

//Check and repot unused imports
const checkUnusedImports = () => {
    try {
      const result = execSync('npx ts-unused-exports projects/main-app/tsconfig.app.json', { encoding: 'utf-8' });
      if (result) {
        console.warn('Unused imports found:\n', result);
      } else {
        console.log('No unused imports found.');
      }
    } catch (error) {
      console.error('Error checking for unused imports:', error.message);
    }
  };

// Run the tasks
updateBuildDate();
checkUnusedImports();
