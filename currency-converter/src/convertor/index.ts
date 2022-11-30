import axios from "axios";
import chalk from "chalk";

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
            Accept: "application/json",
            "Accept-Encoding": "identity",
          },
        }
      );
      return result.data;
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
      const result = await axios(
        `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`,
        {
          headers: {
            apiKey: access_key,
            Accept: "application/json",
            "Accept-Encoding": "identity",
          },
        }
      );
      return result.data;
    } catch (error) {
      console.log(chalk.red(error));
    }
  }
}

export default Converter;
