import * as readline from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import { validator } from "./validator";
import { Coordinate } from './coordinate';
import { format, openMap } from './geojson-utils';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";


let coordinateArray: Coordinate[] = [];

let lines: Coordinate[][] = [];

let polygons: Coordinate[][] = [];


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
        if (coordinateArray.length === 0 && lines.length === 0 && polygons.length === 0) {
            console.log("No coordinates to map");
            rl.prompt();
            return;
        }
        openMap(format(coordinateArray, lines, polygons));
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
    if (line === "poly" || line.includes("poly ")) {
        createPolygon(line);
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

function createPolygon(line: string) {
    if(line.includes('-n')){
        let polygonCoords: Coordinate[] = [];
        rl.close()
        rl = readline.createInterface({ input, output })
        rl.on('line', (line) => {
        
            if(line === "close"){
                if(polygonCoords.length < 3){
                    console.log("Not enough points entered to create polygon");
                    rl.prompt();
                    return
                }
                polygons.push(polygonCoords);
                resetInput("Polygon created");
            } else {
                const coordinateOne = validator(line)
                if (!coordinateOne) {
                    console.error("Not a valid coordinate")
                    rl.prompt();
                    return;
                }
                polygonCoords.push(coordinateOne);
                rl.prompt();
            }
        })
        console.log("Enter coordinates of polygon\nType close to stop the polygon.");
        rl.prompt();
    } else {
        let coordArray: Coordinate[] = []
        if(coordinateArray.length >= 3){
            coordArray.push(coordinateArray.pop());
            coordArray.push(coordinateArray.pop());
            coordArray.push(coordinateArray.pop());
            lines.push(coordArray);
            console.log("Created polygon using all the points");
            rl.prompt();
            return;
        }else {
            console.log("Not enough points entered to create polygon");
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