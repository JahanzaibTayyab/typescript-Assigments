#!/usr/bin/env node
import inquirer from "inquirer";
import LanguageInterface from "../interfaces/language-interface.js";

class Language {
  _name: string;
  _status: boolean;
  _content: any;

  constructor(object: any = {}) {
    this._name = object.language || "";
    this._status = object.config || false;
    this._content = object.name || object[this._name];
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

  static languagePrompt(listOfLanguage: Array<LanguageInterface>) {
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
    return inquirer.prompt(question);
  }
}

export default Language;
