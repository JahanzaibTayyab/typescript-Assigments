import figlet from "figlet";
import ora from "ora";
import inquirer from "inquirer";

let continueOption: boolean = false;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const countWords = (input: string): number => {
  const arr = input.split(" ");
  return arr.filter((word) => word !== "").length;
};

const init = async () => {
  const spinner = ora();
  console.log(figlet.textSync("WORD - COUNTER"));
  const result = await inquirer.prompt([
    {
      type: "input",
      name: "paragraph",
      message: "Enter your text",
      validate(value) {
        return value?.length ? true : "Please add your text";
      },
    },
  ]);
  const paragraph = result.paragraph.trim();
  const wordCount = countWords(paragraph);
  spinner.start("Calculating...");
  await sleep();
  spinner.stop();
  spinner.succeed(wordCount + " words " + paragraph.length + " character ");
  const choice = await inquirer.prompt({
    name: "continue_Operation",
    type: "confirm",
    message: "Do you want to continue? ",
  });
  continueOption = choice.continue_Operation;
  console.clear();
};
do {
  init();
} while (continueOption);
