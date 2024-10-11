import { spawnSync } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';

async function main() {
  const spinner = ora('Processing...');
  try {
    let answers = await promptUserInput();

    // Handle additional prompts for production and iOS development profiles
    answers = await handleProductionProfile(answers);
    answers = await handleIOSDevelopmentProfile(answers);

    // Run pre-build tasks based on the profile
    runPreBuildTasks(answers.profile);

    // Construct the build command based on user inputs
    const command = constructEASCommand(answers);

    console.info('> Command: ', command);

    spinner.start();

    // Execute the build command
    runCommandSync(
      command,
      `> EAS build finished successfully with profile: ${answers.profile}`
    );

    spinner.succeed('Operation completed successfully.');
  } catch (error) {
    console.error('> Error:', error.message);
    spinner.fail('Operation failed.');
  }
}

main();

/**
 * Prompts user for platform, profile, and release message input.
 * @returns {Promise<object>} User inputs.
 */
async function promptUserInput() {
  const platformOptions = ['Android', 'iOS', 'All'];
  const profileOptions = ['Development', 'Testing', 'Staging', 'Production'];

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

  return answers;
}

/**
 * Prompts for additional input if the selected profile is Production.
 * @param {object} answers - The current answers object.
 * @returns {Promise<object>} Updated answers object.
 */
async function handleProductionProfile(answers) {
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
  return answers;
}

/**
 * Prompts for additional input if the selected platform is iOS and profile is Development.
 * @param {object} answers - The current answers object.
 * @returns {Promise<object>} Updated answers object.
 */
async function handleIOSDevelopmentProfile(answers) {
  if (answers.platform === 'iOS' && answers.profile === 'Development') {
    const devSimulatorAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'simulator',
        message: 'Build for simulator or real device?',
        choices: ['Simulator', 'Device'],
      },
    ]);
    answers.simulator = devSimulatorAnswer.simulator;
  }

  if (answers.simulator === 'Simulator') {
    answers.profile = 'Simulator';
  }

  return answers;
}

/**
 * Constructs the EAS build command based on the user's inputs.
 * @param {object} answers - The user inputs.
 * @returns {string} The constructed command.
 */
function constructEASCommand(answers) {
  const platformMap = {
    Android: 'android',
    iOS: 'ios',
    All: 'all',
  };

  const profileMap = {
    Simulator: 'dev:simulator',
    Development: 'dev',
    Testing: 'test',
    Staging: 'stag',
    Production: 'prod',
  };

  let command = `eas build --platform ${platformMap[answers.platform]} --profile ${profileMap[answers.profile]} --message "${answers.message}"`;

  if (answers.autoSubmit === 'Yes') {
    command += ' --auto-submit';
  }

  return command;
}

/**
 * Runs pre-build tasks based on the profile, such as compiling translations.
 * @param {string} profile - The build profile.
 * @throws Will throw an error if a pre-build task fails.
 */
function runPreBuildTasks(profile) {
  const i18nCommand =
    profile === 'Production' ? 'npm run i18n:compile' : 'npm run i18n:compile';

  runCommandSync(i18nCommand, '> Translations compiled successfully.');
}

/**
 * Executes a shell command synchronously and handles errors.
 * @param {string} command - The command to execute.
 * @param {string} successMessage - Message to log on success.
 */
function runCommandSync(command, successMessage) {
  const result = spawnSync(command, { stdio: 'inherit', shell: true });

  if (result.error) {
    console.error(`> Error executing command: ${command}`, result.error);
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Command failed with exit code: ${result.status}`);
  }

  console.info(successMessage);
}
