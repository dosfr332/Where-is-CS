import { group } from "node:console";
import { Coordinate, point } from "./coordinate";

const standardRegEx: RegExp = /^(?<Lat>-?(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)[,;]?\s(?<Long>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)(?:\s(?<label>[a-zs A-Z\s]*))?$/;
const dmsRegEx: RegExp = /^(?<dmsLat>-?(?:[0-9]|[1-8][0-9]|90))(?:[°d]\s?)(?<dmsLatMin>[0-5][0-9]|[0-9])(?:['"m]\s?|\s)(?<dmsLatSec>[0-5][0-9]|[0-9])(?:['"s]\s?)(?<dmsLatDir>[NS])?,?\s+(?<dmsLong>-?(?:[0-9]|[1-8][0-9]|90))(?:[°d]\s?)(?<dmsLongMin>[0-5][0-9]|[0-9])(?:['"m]\s?|\s)(?<dmsLongSec>[0-9]|[0-5][0-9])(?:['"s]\s?)(?<dmsLongDir>[EW])?(?:\s(?<label>[a-zs A-Z\s]*))?$/
const dmRegEx: RegExp = /^(?<ddmLat>-?(?:[0-9]|[1-8][0-9]|90))(?:[°d]\s?|\s)(?<ddmLatMin>[0-5]?[0-9](?:\.\d{1,6})?)(?:['"′m]?\s?)(?<ddmLatDir>[NS])?,?\s+(?<ddmLong>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180))(?:[°d]\s?|\s)(?<ddmLongMin>[0-5]?[0-9](?:\.\d{1,6})?)(?:['"′m]?\s?)(?<ddmLongDir>[EW])?(?:\s(?<label>[a-zs A-Z\s]*))?$/
const directionRegEx: RegExp = /^(?<dirLat>(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)['"]?\s*(?<dirLatDir>[NS]),?\s*(?<dirLong>(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)['"]?\s?(?<dirLongDir>[EW])(?:\s(?<label>[a-zs A-Z\s]*))?$/

export function validator(input: string): Coordinate {
    if (standardRegEx.test(input)) {
        var match = input.match(standardRegEx);
        let lat: point = { value: match.groups.Lat, direction: null };
        let long: point = { value: match.groups.Long, direction: null };
        let label: string = match.groups.label;
        return new Coordinate(lat, long, label)

    } else if (dmsRegEx.test(input)) {
        var match = input.match(dmsRegEx);
        let convertedLat: number = Number(match.groups.dmsLat) + (Number(match.groups.dmsLatMin) / 60) + (Number(match.groups.dmsLatSec) / 3600)
        let convertedLong: number = Number(match.groups.dmsLong) + (Number(match.groups.dmsLongMin) / 60) + (Number(match.groups.dmsLongSec) / 3600)

        let lat: point = { value: convertedLat.toString(), direction: match.groups.dmsLatDir };
        let long: point = { value: convertedLong.toString(), direction: match.groups.dmsLongDir }
        let label: string = match.groups.label

        return new Coordinate(lat, long, label)

    } else if (dmRegEx.test(input)) {
        var match = input.match(dmRegEx)
        console.log(JSON.stringify(match.groups, null, 4))

        let convertedLat: number = Number(match.groups.ddmLat) + (Number(match.groups.ddmLatMin) / 60)
        let convertedLong: number = Number(match.groups.ddmLong) + (Number(match.groups.ddmLongMin) / 60)

        let lat: point = { value: convertedLat.toString(), direction: match.groups.ddmLatDir }
        let long: point = { value: convertedLong.toString(), direction: match.groups.ddmLongDir }
        let label: string = match.groups.label

        return new Coordinate(lat, long, label)

    } else if (directionRegEx.test(input)) {
        var match = input.match(directionRegEx)

        let lat: point = { value: match.groups.dirLat, direction: match.groups.dirLatDir };
        let long: point = { value: match.groups.dirLong, direction: match.groups.dirLongDir };
        let label: string = match.groups.label

        return new Coordinate(lat, long, label)
    } else {
        return null;
    }
}
