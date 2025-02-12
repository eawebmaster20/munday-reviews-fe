const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const targetPath = 'src/environments/environment.ts';

const args = process.argv.slice(2);
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    process.env[key] = value;
  }
});

const envConfigFile = `
  export const environment = {
    apiUrl: ${process.env['apiUrl']} || ''
  };
`;
console.log(process.env);
fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log(`Environment file created at ${targetPath}`);
