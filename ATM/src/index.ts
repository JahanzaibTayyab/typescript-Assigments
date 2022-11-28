#! /usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import UserInput from "./interfaces/user-input.js";
import ATMOperations from "./interfaces/atm-features.js";
import { performOperations } from "./atm/index.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let again: boolean = false;

const welcomeMessage = async () => {
  const rainbowTitle = chalkAnimation.rainbow(
    "Command Line ATM using Node.js, TypeScript, and Inquirer\n"
  );
  await sleep();
  rainbowTitle.stop();
};
console.clear();
await welcomeMessage();

let totalAmount: number = 0;

const validateUserPin = (input: string) => {
  const pass = input.match(/^\d{4}$/);
  return pass ? true : "Invalid Pin";
};

const promptLogin = async (): Promise<void> => {
  const userInfo: UserInput = await inquirer.prompt([
    {
      type: "string",
      name: "userId",
      message: "Enter Your user Id:",
      default() {
        return null;
      },
    },
    {
      type: "password",
      name: "userPin",
      message: "Enter PIN:",
      mask: "*",
      validate: validateUserPin,
    },
  ]);
  console.log(`
      ${chalk.bgGreenBright("Welcome to Panaverse ATM")}
    `);
  const operationSelection: ATMOperations = await inquirer.prompt([
    {
      name: "operation",
      message: "Choose an operation",
      type: "rawlist",
      choices: ["Deposit Money", "Balance", "Withdraw", "Show Data", "Cancel"],
    },
  ]);
  const result = await performOperations(
    operationSelection,
    totalAmount,
    userInfo.userId
  );
  totalAmount = result;
  console.log(`${chalk.bgCyanBright("Available Amount: ")} ${totalAmount}`);
  const { confirm } = await inquirer.prompt([
    {
      name: "confirm",
      message: "Do you want to do another transaction?",
      type: "confirm",
    },
  ]);
  again = confirm;
  console.log("\n\n");
  console.clear();
};

do {
  await promptLogin();
} while (again);
