import * as readline from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import { validator } from "./validator";
import { Coordinate } from './coordinate';
import { format, openMap } from './geojson-utils';


let coordinateArray: Coordinate[] = [];

let lines: Coordinate[][] = [];


var rl = readline.createInterface({ input, output })

console.log("Please enter a coordinate or command")
rl.prompt()

const readAndValidate = (line: string) => {
    // console.log(line);
    if (line === "") {
        rl.prompt()
        return;
    }
    if (line === "map") {
        if (coordinateArray.length === 0 && lines.length === 0) {
            console.log("No coordinates to map");
            rl.prompt();
            return;
        }
        openMap(format(coordinateArray, lines));
        rl.prompt();
        return;
    }
    if (line === "print") {
        if (coordinateArray.length == 0) {
            console.log("No coordinates to print");
            rl.prompt();
            return;
        }
        for (let coordinate of coordinateArray) {
            console.log(coordinate.toString());
        }
        rl.prompt();
        return;
    }
    if (line === "clear") {
        coordinateArray = [];
        lines = [];
        console.log("Coordinates cleared");
        rl.prompt()
        return;
    }
    if (line === "line" || line.includes("line ")) {
        createLine(line);
        return;
    }

    const coordinate = validator(line)
    if (!coordinate) {
        console.error("Not a valid coordinate or command")
        rl.prompt()
        return

    }
    coordinate.toString();
    coordinateArray.push(coordinate)
    rl.prompt()
}

rl.on('line', readAndValidate);

function createLine(line: string) {
    if(line.includes(" -n")){
        let lineCoords: Coordinate[] = [];
        rl.close()
        rl = readline.createInterface({ input, output })
        rl.on('line', (line) => {
            if(lineCoords.length === 0){
                const coordinateOne = validator(line)
                if (!coordinateOne) {
                    console.error("Not a valid coordinate")    
                    rl.prompt();
                    return;
                }
                lineCoords.push(coordinateOne);
                rl.prompt();
            }
            else if(lineCoords.length === 1){
                const coordinateTwo = validator(line)
                if (!coordinateTwo) {
                    console.error("Not a valid coordinate")
                    rl.prompt();
                    return;
                }
                lineCoords.push(coordinateTwo);
                lines.push(lineCoords);
                resetInput("Line created");
            }
        })
        console.log("Enter two coordinates of line");
        rl.prompt();
    }else if (line === "line"){
        let coordArray: Coordinate[] = []
        if(coordinateArray.length >= 2){
            coordArray.push(coordinateArray.pop());
            coordArray.push(coordinateArray.pop());
            lines.push(coordArray);
            console.log("Created line using last two points");
            rl.prompt();
            return;
        }else {
            console.log("Not enough points entered to create line");
            rl.prompt();
            return
        }
    }
}

function resetInput(message: string){
    console.log(message);
    rl.close();
    rl = readline.createInterface({ input, output })
    rl.prompt();
    rl.on("line", readAndValidate);
}