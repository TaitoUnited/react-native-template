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
      Staging: 'stag',
      Production: 'prod',
    };

    const branchName = profileMap[answers.profile];

    // Run pre-build tasks based on the profile
    runPreBuildTasks(answers.profile);

    const envFilePath = path.resolve(process.cwd(), '.env');
    loadEnvFile(envFilePath);

    // Optional: Validates that critical environment variables are set
    validateEnvVars([]); // Add any other critical variables you need for your build process

    const { command, redactedCommand } = constructEASCommand(
      branchName,
      answers.message
    );
    console.info('> Command: ', redactedCommand);

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
  const profileOptions = ['Development', 'Testing', 'Staging', 'Production'];

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
  const i18nCommand =
    profile === 'Production' ? 'npm run i18n:compile' : 'npm run i18n:compile';

  runCommandSync(i18nCommand, '> Translations compiled successfully.');
}

/**
 * Loads environment variables from a .env file into process.env.
 * @param {string} filePath - Path to the .env file.
 */
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`> Warning: .env file not found at ${filePath}`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');

  lines.forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/); // Match key=value pairs
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/(^['"]|['"]$)/g, ''); // Remove surrounding quotes
      process.env[key] = value;
    }
  });

  console.info('> Environment variables loaded from .env file.');
}

/**
 * Constructs the command string for the EAS update.
 * @param {string} branchName - The branch name to use for the update.
 * @param {string} message - The message describing the update.
 * @returns {{command: string, redactedCommand: string}} The command and the redacted command string.
 */
function constructEASCommand(branchName, message) {
  let command = `APP_ENV=${branchName}`;
  let redactedCommand = command;

  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith('EXPO_PUBLIC_') && value) {
      const escapedValue = escapeShellValue(value);
      command += ` ${key}=${escapedValue}`;
      redactedCommand += ` ${key}=${redactValue(value)}`;
    }
  }
  const easUpdateCommand = ` eas update --branch ${branchName} --message "${message}"`;
  command += easUpdateCommand;
  redactedCommand += easUpdateCommand;

  return { command, redactedCommand };
}

/**
 * Escapes special characters in shell commands: ^, #, $, |, ", ', \, and others.
 *
 * @param {string} value - The value to escape.
 * @returns {string} The escaped value.
 */
function escapeShellValue(value) {
  return value.replace(/(["'$`\\|^#])/g, '\\$1');
}

/**
 * Redacts sensitive values for logging.
 * @param {string} value - The value to be redacted.
 * @returns {string} - The redacted value.
 */
function redactValue(value) {
  if (!value) return 'N/A';
  const length = value.length;
  if (length <= 2) return value; // Too short to redact
  return `${value[0]}${'*'.repeat(length - 2)}${value[length - 1]}`;
}

/**
 * Validates that required environment variables are set.
 * @param {string[]} requiredVars - List of required environment variables.
 */
function validateEnvVars(requiredVars) {
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.warn(`> Warning: Environment variable ${varName} is not set.`);
    }
  });
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
