export type direction = "N" | "E" | "W" | "S";

export interface point{
    value: string,
    direction: direction
}

export class Coordinate{
    lat: point;
    long: point;
    label: string;

    constructor(lat: point, long: point, label: string, ){
        this.lat = lat;
        this.long = long;
        this.label = label;
    }

    
    toString(){
        let completeObject = {lat: this.lat, long: this.long, label: this.label}
        return JSON.stringify(completeObject, null, 4)
    }
}