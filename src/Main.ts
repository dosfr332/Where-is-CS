import * as readline from "node:readline";
import { stdin as input, stdout as output } from 'node:process';
import { validator } from "./validator";
import { Coordinate } from './coordinate';
import { format, openMap } from './geojson-utils';
// import * as fs from "node:fs";

let coordinateArray: Coordinate[] = [];

let lines: Coordinate[][] = [];

let polygons: Coordinate[][] = [];

let rl = readline.createInterface({ input, output })

console.log("Please enter a coordinate or command")
rl.prompt()

const readAndValidate = (line: string, options : string) : boolean => {
    // console.log(line);
    if (line === "") {
        rl.prompt();
        return true;
    }
    if (line === "map") {
        if (coordinateArray.length === 0 && lines.length === 0 && polygons.length === 0) {
            console.log("No coordinates to map");
            rl.prompt();
            return true;
        }
        openMap(format(coordinateArray, lines, polygons));
        rl.prompt();
        return true;
    }
    if (line === "print") {
        if (coordinateArray.length == 0) {
            console.log("No coordinates to print");
            rl.prompt();
            return true;
        }
        let count : number = 0;
        for (let coordinate of coordinateArray) {
            console.log(`${count+1}) ${coordinate.toString()}`);
            count++;
        }
        rl.prompt();
        return true;
    }
    // if(line === "file"){
    //     readFile();
    //     return true;
    // }
    if (line === "poly" || line.includes("poly ")) {
        createPolygon(line);
        return true;
    }
    if (line === "clear") {
        coordinateArray = [];
        lines = [];
        polygons = [];
        console.log("Coordinates cleared");
        rl.prompt()
        return true;
    }
    if (line === "line" || line.includes("line ")) {
        createLine(line);
        return true;
    }

    const coordinate = validator(line)
    if(!coordinate && options === "f"){
        return false;
    }
    if (!coordinate) {
        console.error("Not a valid coordinate or command")
        rl.prompt()
        return false;

    }
    coordinate.toString();
    coordinateArray.push(coordinate)
    rl.prompt()
}

rl.on('line', readAndValidate);

function createLine(line: string) : void {
    if(line.includes(" -n")){
        let lineCoords: Coordinate[] = [];
        rl.close()
        rl = readline.createInterface({ input, output })
        rl.on('line', (line : string) : void => {
            if(lineCoords.length === 0){
                const coordinateOne: Coordinate = validator(line)
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

function createPolygon(line: string) : void {
    if(line.includes('-n')){
        let polygonCoords: Coordinate[] = [];
        rl.close()
        rl = readline.createInterface({ input, output })
        rl.on('line', (line : string) : void => {
        
            if(line === "close"){
                if(polygonCoords.length < 3){
                    console.log("Not enough points entered to create polygon");
                    rl.prompt();
                    return
                }
                polygonCoords.push(polygonCoords[0]);
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
            polygons.push(coordArray);
            console.log("Created polygon using last 3 the points");
            rl.prompt();
            return;
        }else {
            console.log("Not enough points entered to create polygon");
            rl.prompt();
            return;
        }
    }
}

// function readFile() : void {
//     rl.close()
//     rl = readline.createInterface({ input, output })
//     console.log("Please enter file path from root directory")
//     rl.prompt();
//
//     rl.on('line', (line : string) : void => {
//         fs.readFile(line, (err: NodeJS.ErrnoException, data: Buffer): void => {
//             if (err) {
//                 resetInput("Cannot find file")
//                 return;
//             }
//             let coordString: string = data.toString();
//             let coordArray: string[] = coordString.split('\n');
//             let failed: number = 0;
//             for (let line of coordArray) {
//                 if (!readAndValidate(line, "")) {
//                     failed++;
//                 }
//             }
//             console.log(failed);
//             if (failed !== 0) {
//                 console.log(`${failed} coordinate/s or command/s were invalid`);
//                 return;
//             } else {
//                 return;
//             }
//         })
//     })
// }

function resetInput(message: string) : void{
    console.log(message);
    rl.close();
    rl = readline.createInterface({ input, output })
    rl.prompt();
    rl.on("line", readAndValidate);
}