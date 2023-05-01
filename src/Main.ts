import * as readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { validator } from "./validator"


let coordinateArray = [];


const rl = readline.createInterface({ input, output })

console.log("Please enter a coordinate")
rl.prompt()

const readAndValidate = (line: string) => {
    // console.log(line);
    if (line === "") {
        rl.prompt()
        return;
    }
    const coordinate = validator(line)
    if (!coordinate){
        console.error("Not a valid coordinate")
        rl.prompt()

    }else{
        console.log(coordinate.toString());
        rl.prompt()
    }
    // coordinate.format();
    // coordinate.openMap();
}

rl.on('line', readAndValidate);


rl.on('close', function (cmd) {
    process.exit(0);
});