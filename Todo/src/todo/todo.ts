import fs from "fs";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Todo from "src/interfaces/add-todo.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spinner = createSpinner();

const validateInput = (value: string) => {
  return value.length ? true : "Title is mandatory";
};

const validateNumberInput = (input: string) => {
  if (isNaN(parseInt(input)) || input === "") {
    return "Not a valid amount";
  } else {
    return true;
  }
};

const createTodo = async () => {
  const data: Todo = await inquirer.prompt([
    {
      type: "string",
      name: "title",
      message: "Title:",
      validate: validateInput,
    },
    {
      type: "string",
      name: "description",
      message: "Description:",
    },
  ]);
  try {
    fs.access(__dirname + "/todos.json", (err) => {
      if (err) {
        fs.writeFileSync(__dirname + "/todos.json", JSON.stringify([]));
      }
      const todoBuffer = fs.readFileSync(__dirname + "/todos.json");
      let dataJSON = todoBuffer.toString();
      const todos: Array<Todo> = JSON.parse(dataJSON);
      const duplicateTodo = todos.find((todo) => {
        return todo.title === data.title;
      });
      if (!duplicateTodo) {
        todos.push({
          ...data,
          id: todos.length + 1,
          status: false,
        });
        dataJSON = JSON.stringify(todos);
        fs.writeFileSync(__dirname + "/todos.json", dataJSON);
        spinner.success({
          text: `Todo ${chalk.bold.bgGreenBright(
            data.title
          )} added successfully`,
        });
      } else {
        spinner.error({
          text: "New Todo title has already been used",
        });
      }
    });
  } catch (error) {
    console.log(chalk.red("An error occured, try again"));
  }
};

const listTodo = () => {
  try {
    const todoBuffer = fs.readFileSync(__dirname + "/todos.json");
    let dataJSON = todoBuffer.toString();
    const todos: Array<Todo> = JSON.parse(dataJSON);
    todos.map((todo) => {
      console.log(`\n ${todo.id}: ${chalk.bgGray(todo.title)}`);
    });
  } catch (error) {
    console.log(chalk.red("An error occured, try again"));
  }
};

const getOneTodo = async () => {
  const data: Todo = await inquirer.prompt([
    {
      type: "string",
      name: "title",
      message: "Title:",
      validate: validateInput,
    },
  ]);
  try {
    const todoBuffer = fs.readFileSync(__dirname + "/todos.json");
    let dataJSON = todoBuffer.toString();
    const todos: Array<Todo> = JSON.parse(dataJSON);
    const Todo: Todo | undefined = todos.find((item) => {
      return item.title.toLowerCase() === data.title.toLowerCase();
    });
    Todo
      ? console.log(
          `\n Id: ${Todo?.id}\n Title:${chalk.bgGray(
            Todo?.title
          )} \n Description: ${chalk.bgCyan(Todo?.description)}`
        )
      : spinner.error({
          text: "Cannot find todo with this title",
        });
  } catch (error) {
    console.log(chalk.red("An error occured, try again"));
  }
};

const deleteTodo = async () => {
  const data: Todo = await inquirer.prompt([
    {
      type: "string",
      name: "title",
      message: "Todo Id",
      validate: validateNumberInput,
    },
  ]);
  try {
    const todoBuffer = fs.readFileSync(__dirname + "/todos.json");
    let dataJSON = todoBuffer.toString();
    const todos: Array<Todo> = JSON.parse(dataJSON);
    const remain = todos.filter((item) => {
      return item.id != data.id;
    });
    dataJSON = JSON.stringify(remain);
    fs.writeFileSync(__dirname + "/todos.json", dataJSON);
    if (remain.length === todos.length) {
      console.log(chalk.red("This file does not exist"));
    } else {
      spinner.success({
        text: `Todo was deleted successfully`,
      });
    }
  } catch (error) {
    console.log(chalk.red("An error occured, try again"));
  }
};

const markAsDone = async () => {
  const data: Todo = await inquirer.prompt([
    {
      type: "string",
      name: "title",
      message: "Title:",
      validate: validateInput,
    },
  ]);
  try {
    const todoBuffer = fs.readFileSync(__dirname + "/todos.json");
    let dataJSON = todoBuffer.toString();
    const todos: Array<Todo> = JSON.parse(dataJSON);
    const todoIndex = todos.findIndex((item) => {
      return item.title.toLowerCase() === data.title.toLowerCase();
    });
    todos.splice(todoIndex, 1, {
      ...todos[todoIndex],
      status: true,
    });
    dataJSON = JSON.stringify(todos);
    fs.writeFileSync(__dirname + "/todos.json", dataJSON);
    spinner.success({
      text: `Todo marked as done`,
    });
  } catch (error) {
    console.log(chalk.red("An error occured, try again"));
  }
};

const todoReport = () => {
  try {
    const todoBuffer = fs.readFileSync(__dirname + "/todos.json");
    let dataJSON = todoBuffer.toString();
    const todos: Array<Todo> = JSON.parse(dataJSON);
    const filterTodoData = todos.filter((item) => item.status === false);
    const filterDoneData = todos.filter((item) => item.status === true);
    console.log(`
      ${chalk.bgBlue("TODO Report")}\n
      Completed: ${chalk.bgCyanBright(filterDoneData.length)} .\n
      Remaining: ${chalk.bgMagenta(filterTodoData.length)} .\n
    `);
  } catch (error) {
    console.log(chalk.red("An error occured, try again"));
  }
};

export { createTodo, listTodo, getOneTodo, deleteTodo, markAsDone, todoReport };
