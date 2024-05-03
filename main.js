import inquirer from "inquirer";
import chalk from "chalk";
function startTime(duration) {
    let timeRemaining = duration;
    const intervalID = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(intervalID);
            console.log(chalk.italic.bold.redBright("\t\t\tTime's up!"));
            console.log(chalk.italic.bold.bgCyanBright("\t\t\t\tPress Enter to exit..."));
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.on('data', process.exit.bind(process, 0));
        }
        else {
            console.log(chalk.italic.bgGrey(`\tTime remaining: ${timeRemaining} seconds`));
        }
    }, 1000); // Interval set to 1 second (1000 milliseconds)
}
async function main() {
    console.log(chalk.bold.underline.blue('\t\t\t\tWelcome to the Countdown Timer..!!!\n'));
    const { duration } = await inquirer.prompt([
        {
            type: "number",
            name: "duration",
            message: chalk.bold.magentaBright('Please Enter the Duration of the Countdown in Seconds: '),
            validate: (input) => {
                if (input > 0) {
                    return true;
                }
                else {
                    console.log(chalk.bold.yellow('Please enter a valid duration (greater than 0).'));
                    return false;
                }
            }
        }
    ]);
    if (duration) {
        console.log(chalk.bold.green(`\t\t\t\tCountdown started for ${duration} seconds...`));
        startTime(duration);
    }
    else {
        console.log(chalk.bold.red('\t\t\t\tInvalid input. Please try again.'));
    }
}
main();
