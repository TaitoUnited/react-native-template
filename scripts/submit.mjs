import { exec } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';

async function main() {
  const platformOptions = ['Android', 'iOS', 'All'];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select the platform: ',
      choices: platformOptions,
    },
  ]);

  const { platform } = answers;

  const platformMap = {
    Android: 'android',
    iOS: 'ios',
    All: 'all',
  };

  const command = `eas submit --platform ${platformMap[platform]} --latest`;

  const spinner = ora('Processing...').start();

  exec(command, (err, stdout, stderr) => {
    spinner.stop();

    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

main();
