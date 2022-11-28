import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import ATMOperations from "src/interfaces/atm-features.js";

export const performOperations = async (
  { operation }: ATMOperations,
  totalAmount: number,
  userName: string
): Promise<number> => {
  const spinner = createSpinner("Perform Operation");
  let result: number = 0;
  const validateInput = (input: string) => {
    if (isNaN(parseInt(input)) || input === "") {
      return "Not a valid amount";
    } else {
      return true;
    }
  };

  const depositMoney = async (): Promise<number> => {
    const { amount } = await inquirer.prompt([
      {
        type: "string",
        name: "amount",
        message: "Enter Amount",
        validate: validateInput,
      },
    ]);
    return parseInt(amount);
  };

  const withDrawMoney = async (): Promise<number> => {
    const { amount } = await inquirer.prompt([
      {
        type: "string",
        name: "amount",
        message: "Enter Amount",
        validate: validateInput,
      },
    ]);
    return parseInt(amount);
  };

  switch (operation) {
    case "Balance":
      spinner.success({
        text: `Your Total Balance is: ${chalk.bgGreen(totalAmount)}`,
      });
      break;
    case "Deposit Money":
      const depositAmount: number = await depositMoney();
      result = totalAmount + depositAmount;
      spinner.success({
        text: `Your transaction completed Successfully`,
      });
      break;

    case "Withdraw":
      if (totalAmount <= 0) {
        spinner.error({
          text: `${chalk.red(
            "Your balance is not enough for this transaction, Please deposit some amount in your bank account"
          )}`,
        });
      } else {
        const withDrawAmount: number = await withDrawMoney();
        result = totalAmount - withDrawAmount;
        spinner.success({
          text: `Your transaction completed Successfully`,
        });
      }
      break;

    case "Show Data":
      console.log(`
      ${chalk.bgBlue("User Information \n\n")}
      userName :  ${chalk.bgCyanBright(userName)}
      Account No: ${chalk.bgCyan(
        Math.floor(Math.random() * 1000000000000000).toString(10)
      )}
      Account type : ${chalk.bgBlue("Current")}
      Balance : ${chalk.bgYellow(totalAmount)}
    `);
      result = totalAmount;
      break;

    case "Cancel":
      process.exit(0);
    default:
      return 0;
  }
  return result;
};
