import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import figlet from "figlet";
import ora from "ora";
import { initialLanguage } from "./utils/index.js";

const init = async () => {
  const spinner = ora();
  //console.log(figlet.textSync("CURRENCY - CONVERSION"));
  inquirer.registerPrompt("autocomplete", inquirerPrompt);
  const language = await initialLanguage();
  console.log("🚀 ~ file: index.ts ~ line 11 ~ init ~ language", language);
};
init();
