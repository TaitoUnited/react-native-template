import { exec } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';

async function main() {
  const spinner = ora('Processing...');
  try {
    const platformValue = await promptPlatformSelection();

    const command = `eas submit --platform ${platformValue} --latest`;

    console.info('> Command:', command);

    spinner.start();

    executeCommand(command, spinner);
  } catch (error) {
    console.error('> Unexpected Error:', error.message);
    spinner.fail('Operation failed.');
  }
}

main();

/**
 * Prompts the user to select a platform and maps it to the corresponding CLI value.
 * @returns {Promise<string>} The corresponding platform value for the command.
 */
async function promptPlatformSelection() {
  const platformOptions = [
    { name: 'Android', value: 'android' },
    { name: 'iOS', value: 'ios' },
    { name: 'All', value: 'all' },
  ];

  const { platform } = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select the platform:',
      choices: platformOptions,
    },
  ]);

  return platform;
}

/**
 * Executes a shell command and handles its output.
 * @param {string} command - The command to execute.
 * @param {ora.Ora} spinner - The spinner instance for UI feedback.
 */
function executeCommand(command, spinner) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      spinner.fail('Command execution failed.');
      console.error('> Error:', err.message);
      return;
    }

    if (stderr) {
      spinner.fail('Command executed with errors.');
      console.error('> Stderr:', stderr);
      return;
    }

    spinner.succeed('Command executed successfully.');
    console.log('> Output:', stdout);
  });
}
