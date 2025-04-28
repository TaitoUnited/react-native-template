import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import ora from 'ora';

const localeDirs = ['fi'];

/**
 * Executes a shell command synchronously and handles errors.
 * @param {string} command - The command to execute.
 * @param {string} successMessage - Message to log on success.
 */
function runCommandSync(command) {
  const result = spawnSync(command, { stdio: 'inherit', shell: true });

  if (result.error) {
    console.error(`> Error executing command: ${command}`, result.error);
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Command failed with exit code: ${result.status}`);
  }
}

/**
 * Prompts the user to select which locales to process.
 * @param {string[]} localeDirs - Array of locale directories.
 * @returns {Promise<string[]>} The selected locales.
 */
async function promptLocalesSelection(localeDirs) {
  const { selectedLocales } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedLocales',
      message: 'Select the locales you want to process:',
      choices: localeDirs,
      default: localeDirs,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one locale.';
        }
        return true;
      },
    },
  ]);

  return selectedLocales;
}

async function poToCsv(locales) {
  const spinner = ora('Processing...');
  try {
    const localesDir = path.resolve('src/locales');

    spinner.start();
    for (const locale of locales) {
      const untranslatedDir = path.resolve('.translations/untranslated');
      if (!fs.existsSync(untranslatedDir)) {
        fs.mkdirSync(untranslatedDir, { recursive: true });
      }

      const poFilePath = path.join(localesDir, locale, 'messages.po');
      const csvFilePath = path.join(untranslatedDir, `${locale}.csv`);

      console.log(`> Exporting ${locale} locale...`);
      await runCommandSync(`npx po-csv ${poFilePath} > ${csvFilePath}`);
      console.log(`> Exported ${locale} locale to ${csvFilePath}`);
    }
    spinner.succeed('All locales processed successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function csvToPo(locales) {
  const spinner = ora('Processing...');
  try {
    const localesDir = path.resolve('src/locales');
    const translatedDir = path.resolve('.translations/translated');

    spinner.start();
    for (const locale of locales) {
      const csvFilePath = path.join(translatedDir, `${locale}.csv`);
      const poFilePath = path.join(localesDir, locale, 'messages.po');
      const translatedPoFilePath = path.join(
        translatedDir,
        `${locale}-translated.po`
      );

      console.log(`> Importing ${locale} locale...`);

      await runCommandSync(
        `npx po-csv ${poFilePath} ${csvFilePath} > ${translatedPoFilePath}`
      );
      await runCommandSync(`mv ${translatedPoFilePath} ${poFilePath}`);
      console.log(`> Imported ${locale} locale to ${poFilePath}`);
    }
    spinner.succeed('All locales processed successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: [
        { name: 'Export translations (PO to CSV)', value: 'export' },
        { name: 'Import translations (CSV to PO)', value: 'import' },
      ],
    },
  ]);

  const selectedLocales = await promptLocalesSelection(localeDirs);
  console.log(`Selected locales: ${selectedLocales.join(', ')}`);

  if (action === 'export') {
    await poToCsv(selectedLocales);
  } else if (action === 'import') {
    await csvToPo(selectedLocales);
  }
}

main();
