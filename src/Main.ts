import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { validator } from "./validator"


let lineArr = [];


const rl = readline.createInterface({ input, output })

console.log("Please enter a coordinate")
rl.prompt()

const readAndValidate = (line: string) => {
    // console.log(line);
    const coordinate = validator(line)
    if (!coordinate){
        console.error("Not a valid coordinate")
        rl.prompt()

    }else{
        console.log(coordinate.toString());
    }
    // coordinate.format();
    // coordinate.openMap();
}

rl.on('line', readAndValidate);


rl.on('close', function (cmd) {
    console.log(lineArr.join('\n'));
    process.exit(0);
});