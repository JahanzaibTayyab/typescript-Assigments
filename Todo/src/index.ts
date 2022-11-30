#! /usr/bin/env node
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
import inquirer from "inquirer";

import TodoListOption from "./interfaces/todo-list-options.js";
import {
  createTodo,
  listTodo,
  getOneTodo,
  deleteTodo,
  markAsDone,
  todoReport,
} from "./todo/todo.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
let again: boolean = false;

const welcomeMessage = async () => {
  const rainbowTitle = chalkAnimation.rainbow(
    "Command Line TODO App using Node.js, TypeScript, and Inquirer\n"
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`
      ${chalk.bgBlue("HOW TO USE")}\n
      I am a smart todo app on your computer.\n
      Select the option from ${chalk.bgCyanBright("List")}
    `);
};
console.clear();
await welcomeMessage();

const showTodoOptions = async () => {
  const { option }: TodoListOption = await inquirer.prompt([
    {
      name: "option",
      message: "Choose an Option",
      type: "rawlist",
      choices: ["Add", "List", "Delete", "Read", "Done", "Report"],
    },
  ]);
  switch (option) {
    case "Add":
      await createTodo();
      break;
    case "List":
      await listTodo();
      break;
    case "Read":
      await getOneTodo();
      break;
    case "Delete":
      await deleteTodo();
      break;
    case "Done":
      await markAsDone();
      break;
    case "Report":
      await todoReport();
      break;
    default:
      console.log("Invalid Option");
  }
  const { confirm } = await inquirer.prompt({
    name: "confirm",
    type: "confirm",
    message: "Do you want to continue? ",
  });
  again = confirm;
};
do {
  await showTodoOptions();
} while (again);
