#!/usr/bin/env node
import inquirer from "inquirer";
import LanguageInterface from "../interfaces/language-interface.js";

class Language {
  _name: string;
  _status: boolean;
  _content: any;

  constructor(content: LanguageInterface = {}) {
    this._name = content.language || "";
    this._status = content.config || false;
    this._content = content.name || this._name;
  }

  get name(): string {
    return this._name;
  }

  get status(): boolean {
    return this._status;
  }

  set name(name: string) {
    this._name = name;
    this._status = true;
  }

  set status(status: boolean) {
    this._status = status;
  }

  get content(): string {
    return this._content;
  }

  static async languagePrompt(listOfLanguage: Array<LanguageInterface>) {
    const question: any = {
      choices: [],
      message: "Choose the language",
      name: "language",
      type: "list",
      filter: function (answer: string) {
        return listOfLanguage.find((language) => language.content === answer);
      },
    };
    question.choices = listOfLanguage.map((language) => language.content);
    return await inquirer.prompt(question);
  }
}

export default Language;
