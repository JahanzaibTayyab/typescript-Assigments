#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import Language from "../classes/language.js";
import DataBase from "../bin/db.js";
import LanguageInterface from "src/interfaces/language-interface.js";

// const initialQuestion = (listOfelements, message) => {
//   let list;
//   return inquirer.prompt([
//     {
//       type: "autocomplete",
//       name: "converter",
//       message: message,
//       source: async function (answersSoFar, input = " ") {
//         list = await listOfelements.filter((question) =>
//           question.name.toUpperCase().includes(input.toUpperCase())
//         );
//         return list.map((question) => question.name);
//       },
//       filter: function (answer) {
//         return listOfelements.find((question) => question.name === answer);
//       },
//     },
//   ]);
// };
// const questionValue = (message) => {
//   return inquirer.prompt({
//     type: "input",
//     name: "value",
//     message: message,
//   });
// };

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

// let menuPrompt = (listOfchoose, message) => {
//   const question = {
//     choices: [],
//     message: message,
//     name: "choose",
//     type: "list",
//     filter: function (answer) {
//       return listOfchoose.find((language) => language.content === answer);
//     },
//   };
//   question.choices = listOfchoose.map((language) => language.content);

//   return inquirer.prompt(question);
// };

export { initialLanguage };
