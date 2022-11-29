import axios from "axios";
import request from "request";
import chalk from "chalk";
import ora from "ora";
const access_key =
  process.env.CURRENCYLAYER_ACESS_KEY || "0NNlVAzaLR0ciaegQWm6VOp26DN0XFac";

class Converter {
  static async help() {
    try {
      const result = await axios(
        `https://api.apilayer.com/currency_data/live`,
        {
          headers: {
            apiKey: access_key,
          },
        }
      );
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
  static async converter(
    from: string,
    to: string,
    amount: number
  ): Promise<any> {
    try {
      request(
        `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`,
        {
          headers: {
            apiKey: access_key,
          },
        },
        (err, res, body) => {
          console.log("🚀 ~ file: index.ts ~ line 35 ~ Converter ~ body", body);
          if (err) {
            return console.log(err);
          }
          return body?.result;
        }
      );
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
}

export default Converter;
