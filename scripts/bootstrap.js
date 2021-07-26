const configGenerator = require('./generate-config');
const vueConfig = require('../vue.config');

/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, the component name to component mapping,
  and the global config module.
*/

const disconnected = process.argv.some((arg) => arg === '--disconnected');

/*
  CONFIG GENERATION
  Generates the /src/temp/config.js file which contains runtime configuration
  that the app can import and use.
*/
let configOverride = disconnected
  ? { sitecoreApiHost: `http://localhost:${vueConfig.devServer.port}` }
  : {};

// INFO: get current date time
let data = new Date();
configOverride.buildTime = data.toString();

// INFO: get current git version
const { exec } = require("child_process");
exec(`git log -n1 --format=format:"%H"`, (error, stdout, stderr) => {
  if (error) {
    // console.log(`error: ${error.message}`);
    configGenerator(configOverride);
    return;
  }
  if (stderr) {
    // console.log(`stderr: ${stderr}`);
    configGenerator(configOverride);
    return;
  }
  // console.log(`stdout: ${stdout}`);
  configOverride.gitVersion = stdout.toString();
  configGenerator(configOverride);
});


/*
  COMPONENT FACTORY GENERATION
*/
require('./generate-component-factory');
