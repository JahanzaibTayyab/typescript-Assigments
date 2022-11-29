#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import Language from "../classes/language.js";
import DataBase from "../bin/db.js";
import LanguageInterface from "../interfaces/language-interface.js";
import CurrencyInterface from "../interfaces/currency-interface.js";

const initialQuestion = (
  listOfElements: Array<CurrencyInterface>,
  message: string
) => {
  let list;
  return inquirer.prompt([
    {
      type: "autocomplete",
      name: "converter",
      message: message,
      source: async function (answersSoFar: any, input = " ") {
        list = await listOfElements.filter((question) =>
          question.name.toUpperCase().includes(input.toUpperCase())
        );
        return list.map((question) => question.name);
      },
      filter: function (answer) {
        return listOfElements.find((question) => question.name === answer);
      },
    },
  ]);
};
const questionValue = (message: string) => {
  return inquirer.prompt({
    type: "input",
    name: "value",
    message: message,
  });
};

const initialLanguage = async () => {
  let content = DataBase.content();
  if (!content.status) {
    let listOfLanguage: Array<LanguageInterface> = [];
    listOfLanguage.push(new Language({ name: "English", language: "Eng" }));
    let language = (await Language.languagePrompt(listOfLanguage)).language;
    language.status = true;
    DataBase.saveLanguage(language);
    return new Language(DataBase.content());
  }
  return new Language(content);
};

const menuPrompt = (listOfChoose: any, message: string) => {
  const question: any = {
    choices: [],
    message: message,
    name: "choose",
    type: "list",
    filter: function (answer: string) {
      return listOfChoose.find((language: any) => language.content === answer);
    },
  };
  question.choices = listOfChoose.map((language: any) => language.content);
  return inquirer.prompt(question);
};

export { initialLanguage, menuPrompt, questionValue, initialQuestion };
