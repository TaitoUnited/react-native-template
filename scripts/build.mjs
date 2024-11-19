import { spawnSync } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';

async function main() {
  const spinner = ora('Processing...');
  try {
    // Collect user input
    const answers = await gatherInputs();

    // Run pre-build tasks
    runPreBuildTasks(answers.profile);

    // Construct and execute the build command
    const command = constructBuildCommand(answers);
    console.info('> Command:', command);

    spinner.start();
    executeCommandSync(
      command,
      `EAS build completed successfully using profile: ${answers.profile}`
    );
    spinner.succeed('Operation completed successfully.');
  } catch (error) {
    spinner.fail('Operation failed.');
    console.error('> Error:', error.message || error);
  }
}

/**
 * Gathers initial user inputs and processes additional prompts based on conditions.
 * @returns {Promise<object>} Consolidated user inputs.
 */
async function gatherInputs() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'Select the platform:',
      choices: ['Android', 'iOS', 'All'],
    },
    {
      type: 'input',
      name: 'message',
      message: 'Describe this release:',
    },
    {
      type: 'list',
      name: 'profile',
      message: 'Select the profile:',
      choices: ['Development', 'Testing', 'Staging', 'Production'],
    },
  ]);

  // Handle additional prompts based on profile or platform
  return await handleProfileSpecificPrompts(answers);
}

/**
 * Handles additional prompts for profiles like Production or Development (iOS).
 * @param {object} answers - Initial user inputs.
 * @returns {Promise<object>} Updated user inputs.
 */
async function handleProfileSpecificPrompts(answers) {
  const additionalPrompts = [];

  if (answers.profile === 'Production') {
    additionalPrompts.push(
      {
        type: 'list',
        name: 'store',
        message: 'Is this build for Internal use or for the Stores?',
        choices: ['Internal Build', 'Store Build'],
      },
      {
        type: 'list',
        name: 'autoSubmit',
        message: 'Auto-submit to stores?',
        choices: ['Yes', 'No'],
        when: (prevAnswers) => prevAnswers.store === 'Store Build',
      }
    );
  }

  if (answers.platform === 'iOS' && answers.profile === 'Development') {
    additionalPrompts.push({
      type: 'list',
      name: 'simulator',
      message: 'Build for simulator or real device?',
      choices: ['Simulator', 'Device'],
    });
  }

  const additionalAnswers = additionalPrompts.length
    ? await inquirer.prompt(additionalPrompts)
    : {};

  return { ...answers, ...additionalAnswers };
}

/**
 * Constructs the EAS build command based on user inputs.
 * @param {object} answers - User inputs.
 * @returns {string} Constructed build command.
 */
function constructBuildCommand(answers) {
  const platformMap = { Android: 'android', iOS: 'ios', All: 'all' };
  const profileMap = {
    Simulator: 'dev:simulator',
    Development: 'dev',
    Testing: 'test',
    Staging: 'stag',
    'Production (Internal)': 'prod-internal',
    Production: 'prod',
  };

  const platform = platformMap[answers.platform];
  const profile =
    answers.store === 'Internal Build'
      ? 'prod-internal'
      : profileMap[answers.profile];

  let command = `eas build --platform ${platform} --profile ${profile} --message "${answers.message}"`;
  if (answers.autoSubmit === 'Yes') command += ' --auto-submit';

  return command;
}

/**
 * Runs pre-build tasks specific to the selected profile.
 * @param {string} profile - The build profile.
 */
function runPreBuildTasks(profile) {
  const i18nExtractCommand = 'npm run i18n:extract';
  executeCommandSync(
    i18nExtractCommand,
    '> Translations extracted successfully.'
  );

  const i18nCommand =
    profile === 'Production'
      ? 'npm run i18n:compile:strict'
      : 'npm run i18n:compile';

  executeCommandSync(i18nCommand, '> Translations compiled successfully.');
}

/**
 * Executes a shell command synchronously and handles errors.
 * @param {string} command - The shell command to execute.
 * @param {string} successMessage - Message to log upon success.
 */
function executeCommandSync(command, successMessage) {
  const result = spawnSync(command, { stdio: 'inherit', shell: true });

  if (result.error) {
    throw new Error(
      `Error executing command: ${command}\n${result.error.message}`
    );
  }

  if (result.status !== 0) {
    throw new Error(`Command failed with exit code ${result.status}`);
  }

  console.info(successMessage);
}

// Execute the main function
main();
