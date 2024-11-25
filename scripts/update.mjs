import { spawnSync } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

async function main() {
  const spinner = ora('Processing...');
  try {
    const answers = await promptUserInput();
    spinner.start();

    const profileMap = {
      Development: 'dev',
      Testing: 'test',
      'Production (Internal)': 'prod-internal',
      Production: 'prod',
    };

    const branchName = profileMap[answers.profile];

    // Run pre-build tasks based on the profile
    runPreBuildTasks(answers.profile);

    const command = constructEASCommand(branchName, answers.message);
    console.info('> Command: ', command);

    runCommandSync(command, `> EAS update finished for branch: ${branchName}`);
    spinner.succeed('Operation completed successfully.');
  } catch (error) {
    console.error('> Error:', error.message);
    spinner.fail('Operation failed.');
  }
}

main();

/**
 * Prompts user for profile and message input.
 * @returns {Promise<{profile: string, message: string}>} User inputs.
 */
async function promptUserInput() {
  const profileOptions = [
    'Development',
    'Testing',
    'Production (Internal)',
    'Production',
  ];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'profile',
      message: 'Select the profile: ',
      choices: profileOptions,
    },
    {
      type: 'input',
      name: 'message',
      message: 'Give a description of what this update contains: ',
    },
  ]);

  return answers;
}

/**
 * Runs pre-build tasks based on the profile, such as compiling translations.
 * @param {string} profile - The build profile.
 * @throws Will throw an error if a pre-build task fails.
 */
function runPreBuildTasks(profile) {
  const i18nExtractCommand = 'npm run i18n:extract';
  runCommandSync(i18nExtractCommand, '> Translations extracted successfully.');

  const i18nCommand = ['Production', 'Production (Internal)'].includes(profile)
    ? 'npm run i18n:compile:strict'
    : 'npm run i18n:compile';

  runCommandSync(i18nCommand, '> Translations compiled successfully.');
}

/**
 * Constructs the command string for the EAS update.
 * @param {string} branchName - The branch name to use for the update.
 * @param {string} message - The message describing the update.
 * @returns {string} The constructed command string.
 */
function constructEASCommand(branchName, message) {
  const prodBranch = ['prod', 'prod-internal'].includes(branchName) && 'prod';

  const environmentMap = {
    dev: 'development',
    test: 'preview',
    prod: 'production',
    'prod-internal': 'production',
  };

  const environment = environmentMap[branchName];

  const command = `APP_ENV=${prodBranch || branchName} eas update --branch ${branchName} --message "${message}" --environment ${environment}`;

  return command;
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
