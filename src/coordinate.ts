export interface point{
    value: string,
    direction: string
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

    format(){

    }

    openMap(){
        
    }

    toString(){
        let completeObject = {lat: this.lat, long: this.long, label: this.label}
        return JSON.stringify(completeObject, null, 4)
    }
}