#!/usr/bin/env node
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";
import figlet from "figlet";
import ora from "ora";
import {
  initialLanguage,
  menuPrompt,
  initialQuestion,
  questionValue,
} from "./utils/index.js";
import { currencies } from "./constants/index.js";
import LanguageInterface from "./interfaces/language-interface.js";
import Converter from "./convertor/index.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const init = async () => {
  const spinner = ora();
  //console.log(figlet.textSync("CURRENCY - CONVERSION"));
  inquirer.registerPrompt("autocomplete", inquirerPrompt);
  const language: LanguageInterface = await initialLanguage();
  let choose, from, value, to, result;
  do {
    choose = (
      await menuPrompt(
        [
          { content: language.content.choice1, value: 1 },
          { content: language.content.choice2, value: 2 },
          { content: language.content.choice3, value: 3 },
        ],
        language.content.form1
      )
    ).choose;
    switch (choose.value) {
      case 1:
        from = (await initialQuestion(currencies, language.content.form2))
          .converter;
        to = (await initialQuestion(currencies, language.content.form3))
          .converter;
        value = (await questionValue(language.content.form4)).value;
        spinner.start("Coverting...");
        await sleep();
        spinner.stop();
        result = await Converter.converter(from.code, to.code, value);
        break;
      case 2:
        Converter.help();
        break;
      case 3:
        return false;
    }
  } while (true);
};
await init();
