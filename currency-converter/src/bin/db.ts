import fs from "fs";
import chalk from "chalk";
import LanguageInterface from "../interfaces/language-interface.js";

class Database {
  // Save language chosen by user
  static saveLanguage(language: LanguageInterface): void {
    const todoBuffer = fs.readFileSync("db.json");
    const dbContent: any = JSON.parse(todoBuffer.toString());
    try {
      fs.access("db.json", (err) => {
        if (err) {
          fs.writeFileSync(
            "db.json",
            JSON.stringify({
              Eng: {
                name: "English ",
                choice2: "Help ",
                form2: "Please type currency from name, then choose it ",
                form3: "Please type currency to name, then choose it ",
                form4: "Please type the value ",
                form5:
                  "Please input value in format: From To Money => (USD EUR 1)",
                form1: " Choose an option ",
                choice3: "Exit ",
                is: "is ",
                choice1: "Converter ",
              },
              status: true,
              language: "Eng",
              cont_api_key: 0,
            })
          );
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
      const todoBuffer = fs.readFileSync("db.json");
      const dbContent: any = JSON.parse(todoBuffer.toString());
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
    const todoBuffer = fs.readFileSync("db.json");
    const dbContent: any = JSON.parse(todoBuffer.toString());
    return dbContent;
  }

  static api_key(): boolean {
    const todoBuffer = fs.readFileSync("db.json");
    const dbContent: any = JSON.parse(todoBuffer.toString());
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
