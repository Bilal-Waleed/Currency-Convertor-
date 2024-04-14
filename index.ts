#! /user/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//------------------------------------ASKING USER NAME -----------------------------

const askUserName = async () => {
    const userName_ans = await inquirer.prompt({
        name: "user_name",
        type: "input",
        message: chalk.magentaBright(`\nWhat is Your Good Name: `),
        validate: (input) => {
            const trimmedInput = input.trim();
            if (trimmedInput === "") {
              return chalk.redBright("Please enter your name.");
            } else if (!/^[a-zA-Z]+$/.test(trimmedInput)) {
                return chalk.redBright("Please enter a valid name without numbers.");
            }
            return true;
          },
        });
        return userName_ans.user_name;
    };
    const userName = await askUserName();
    
    console.log(chalk.yellow.underline(`\n\t Welcome! "${userName}" in Currency Convertor:\n`));      

    //------------------------------- currency details---------------------------------

    interface Currency {
        name: string;
        symbol: string;
        rate: number;
    }
    
    const currencies: { [key: string]: Currency } = {
        USD: { name: "United States Dollar", symbol: "$", rate: 1 },
        PKR: { name: "Pakistani Rupee", symbol: "Rs", rate: 280},
        EUR: { name: "Euro", symbol: "€", rate: 0.90 },
        GBP: { name: "British Pound Sterling", symbol: "£", rate: 0.80 },
        JPY: { name: "Japanese Yen", symbol: "¥", rate: 153.28 },
        CAD: { name: "Canadian Dollar", symbol: "CA$", rate: 1.35 },
        AUD: { name: "Australian Dollar", symbol: "A$", rate: 1.50 },
        CHF: { name: "Swiss Franc", symbol: "CHF", rate: 0.90 },
        CNY: { name: "Chinese Yuan", symbol: "CN¥", rate: 7.24 },
        INR: { name: "Indian Rupee", symbol: "₹", rate: 80.61 },
        SGD: { name: "Singapore Dollar", symbol: "S$", rate: 1.35 },
    };
    
    //-------------------------------------Main functions------------------------------

async function convertCurrency() {

    let useConvertmore = true;
    while (useConvertmore) {

        const { fromCurrency, toCurrency, amount } = await inquirer.prompt([
            {
                name: "fromCurrency",
                type: "list",
                message: chalk.magenta("Select the currency you want to convert from:"),
                choices: Object.keys(currencies),
            },
            {
                name: "toCurrency",
                type: "list",
                message: chalk.magenta("Select the currency you want to convert to:"),
                choices: Object.keys(currencies),
            },
            {
                name: "amount",
                type: "number",
                message: chalk.magenta("Enter the amount you want to convert:"),
                validate: (input) => input > 0,
            },
        ]);
    
        const fromRate = currencies[fromCurrency].rate;
        const toRate = currencies[toCurrency].rate;
    
        const convertedAmount = (amount * toRate) / fromRate;
    
        console.log(chalk.green(`\n -> Converted amount: ${currencies[toCurrency].symbol}${convertedAmount.toFixed(2)}\n`));

    // message which appear after complete one function  
    const confirmation_ans = await inquirer.prompt({
        name: `user_confirmation`,
        type: `confirm`,
        message: chalk.yellow.bold(`Do you want to convert more currency.? `),
    });

    let develporName = chalk.magenta.underline` BILAL WALEED `;
    if (confirmation_ans.user_confirmation === false) {
        useConvertmore = false;
        console.log(chalk.yellowBright.underline(`\n\t Thanks for using "${userName}", Have a great Day!`));
        console.log(chalk.magenta(`\n\t`,`\t`,`Developer Name: ${develporName}`));
    }
    }
}
convertCurrency();