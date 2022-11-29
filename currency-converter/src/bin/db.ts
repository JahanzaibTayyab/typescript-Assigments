import fs from "fs";
import chalk from "chalk";
import LanguageInterface from "../interfaces/language-interface.js";

const dbContent = {
  Eng: {
    name: "English ",
    choice2: "Help ",
    form2: "Please type currency from name, then choose it ",
    form3: "Please type currency to name, then choose it ",
    form4: "Please type the value ",
    form5: "Please input value in format: From To Money => (USD EUR 1)",
    form1: " Choose an option ",
    choice3: "Exit ",
    is: "is ",
    choice1: "Converter ",
  },
  status: false,
  language: "Eng",
  cont_api_key: 0,
};

class Database {
  // Save language chosen by user
  static saveLanguage(language: LanguageInterface): void {
    dbContent.language = language.name || "";
    dbContent.status = language.status || false;
    dbContent.cont_api_key = 0;
    const dataJSON = JSON.stringify(dbContent);
    try {
      fs.access("db.json", (err) => {
        if (err) {
          fs.writeFileSync("db.json", JSON.stringify({}));
        }
        dbContent.language = language.name || "";
        dbContent.status = language.status || false;
        dbContent.cont_api_key = 0;
        const dataJSON = JSON.stringify(dbContent);
        fs.writeFile("db.json", dataJSON, "utf8", (err) => {
          if (err) return console.log(err);
        });
      });
    } catch (error) {
      console.log(chalk.red("An error occured, try again"));
    }
  }

  // Save language chosen by user
  static saveContent(content: number): void {
    try {
      fs.access("db.json", (err) => {
        if (err) {
          fs.writeFileSync("db.json", JSON.stringify({}));
        }
        dbContent.cont_api_key = content;
        const dataJSON = JSON.stringify(dbContent);
        fs.writeFile("db.json", dataJSON, "utf8", (err) => {
          if (err) return console.log(err);
        });
      });
    } catch (error) {
      console.log(chalk.red("An error occured, try again"));
    }
  }

  // return the default language
  static content() {
    return dbContent;
  }

  // return true if user number conversion without access key <=10 or false
  static api_key(): boolean {
    let value = dbContent.cont_api_key;
    if (value > 9) {
      return false;
    } else {
      value++;
      Database.saveContent(value);
      return true;
    }
  }
}

export default Database;
