import { spawnSync } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';

async function main() {
  const platformOptions = ['Android', 'iOS', 'All'];
  const profileOptions = ['Testing', 'Staging', 'Production'];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select the platform: ',
      choices: platformOptions,
    },
    {
      type: 'list',
      name: 'profile',
      message: 'Select the profile: ',
      choices: profileOptions,
    },
    {
      type: 'input',
      name: 'message',
      message: 'Give a description of what this release contains: ',
    },
  ]);

  if (answers.profile === 'Production') {
    const autoSubmitAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'autoSubmit',
        message: 'Auto-submit to stores?',
        choices: ['Yes', 'No'],
      },
    ]);

    answers.autoSubmit = autoSubmitAnswer.autoSubmit;
  }

  const { platform, profile, message } = answers;

  const platformMap = {
    Android: 'android',
    iOS: 'ios',
    All: 'all',
  };

  const profileMap = {
    Testing: 'test',
    Staging: 'stag',
    Production: 'prod',
  };

  let command = `eas build --platform ${platformMap[platform]} --profile ${profileMap[profile]}`;

  command += ` --message "${message}"`;

  if (answers.autoSubmit === 'Yes') {
    command += ' --auto-submit';
  }

  const spinner = ora('Processing...').start();

  //   // Use spawnSync to run the EAS script synchronously
  const result = spawnSync(command, { stdio: 'inherit', shell: true });

  spinner.stop();

  if (result.error) {
    console.error(result.error);
  } else {
    console.log(`EAS script finished with exit code: ${result.status}`);
  }
}

main();
