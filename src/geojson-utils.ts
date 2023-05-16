import { spawn } from 'node:child_process';
import { Coordinate } from './coordinate';
import axios from 'axios';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import liveServer from 'live-server';

export interface FeatureCollection {
    type: "FeatureCollection";
    features: Feature[];
}

export type type = "Point" | "LineString";

export interface Feature {
    type: "Feature";
    geometry: {
        type: type;
        coordinates: number[] | number[][];
    };
    properties: {
        label: string;
    };
}

export function format(coordinates: Coordinate[], lines: Coordinate[][]): FeatureCollection {
    const features: Feature[] = coordinates.map((coordinate) => {
        const lat = parseFloat(coordinate.lat.value) * (coordinate.lat.direction === 'S' ? -1 : 1);
        const lng = parseFloat(coordinate.long.value) * (coordinate.long.direction === 'W' ? -1 : 1);

        return {
            type: "Feature",
            geometry: {
                type: <type>"Point",
                coordinates: [lng, lat],
            },
            properties: {
                label: coordinate.label,
            },
        };
    });

    const lineFeatures: Feature[] = lines.map((line) => {
        const lineCoordinates = line.map((coordinate) => {
            const lat = parseFloat(coordinate.lat.value) * (coordinate.lat.direction === 'S' ? -1 : 1);
            const lng = parseFloat(coordinate.long.value) * (coordinate.long.direction === 'W' ? -1 : 1);
            return [lng, lat];
        });

        let labelString: string = line[0].label + " " + line[1].label;

        return {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: lineCoordinates,
            },
            properties: {
                label: labelString
            },
        };
    });


    const allFeatures = features.concat(lineFeatures);

    return {
        type: "FeatureCollection",
        features: allFeatures,
    };
}


export function openMap(geoJsonData: Object) {
    
    const encodedGeoJson: string = encodeURIComponent(JSON.stringify(geoJsonData));

    const url: string = `https://geojson.io/#data=data:application/json,${encodedGeoJson}`;
    const browserCommand: string = process.platform === 'win32' ? 'cmd' : 'open';
    const args:string[] = process.platform === 'win32' ? ['/c', 'start', url] : [url];

    spawn(browserCommand, args);
}