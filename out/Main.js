"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("node:readline");
const node_process_1 = require("node:process");
const validator_1 = require("./validator");
let lineArr = [];
const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
console.log("Please enter a coordinate");
rl.prompt();
const readAndValidate = (line) => {
    // console.log(line);
    const coordinate = (0, validator_1.validator)(line);
    if (!coordinate) {
        console.error("Not a valid coordinate");
        rl.prompt();
    }
    else {
        console.log(coordinate.toString());
    }
    // coordinate.format();
    // coordinate.openMap();
};
rl.on('line', readAndValidate);
rl.on('close', function (cmd) {
    console.log(lineArr.join('\n'));
    process.exit(0);
});
//# sourceMappingURL=Main.js.map