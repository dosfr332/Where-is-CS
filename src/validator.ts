import { Coordinate, point, direction } from "./coordinate";

// Lat then Long
const standardRegEx: RegExp = /^(?<Lat>-?(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)[,;\s]?\s+(?<Long>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;
const dmsRegEx: RegExp = /^(?<dmsLat>-?(?:[0-9]|[1-8][0-9]|90))(?:(\s?[°d]\s?)|\s)(?<dmsLatMin>[0-5][0-9]|[0-9])(?:(\s?['′"`m]\s?)|\s)(?<dmsLatSec>[0-5][0-9]|[0-9])(?:\s?[″'"s])?\s?(?<dmsLatDir>[NS])?[,;\s]?\s+(?<dmsLong>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180))(?:(\s?[°d]\s?)|\s)(?<dmsLongMin>[0-5][0-9]|[0-9])(?:(\s?['′`"m]\s?)|\s)(?<dmsLongSec>[1-5][0-9]|[0-9])(?:\s?['″"s])?\s?(?<dmsLongDir>[EW])?(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;
const dmRegEx: RegExp = /^(?<ddmLat>-?(?:[0-9]|[1-8][0-9]|90))(?:\s?[°d]\s?|\s)(?<ddmLatMin>[0-5]?[0-9](?:\.\d{1,6})?)(?:\s?['"′m]?\s?)(?<ddmLatDir>[NS])?[,;\s]?\s+(?<ddmLong>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180))(?:\s?[°d]\s?|\s)(?<ddmLongMin>[0-5]?[0-9](?:\.\d{1,6})?)(?:\s?['"′m]?\s?)(?<ddmLongDir>[EW])?(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;
const directionRegEx: RegExp = /^(?<dirLat>(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)['"]?\s*(?<dirLatDir>[NS])[,;\s]?\s+(?<dirLong>(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)['"]?\s?(?<dirLongDir>[EW])(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;

//Long then Lat
//TODO: Reverse regex and add if conditions
const standardRegExReverse: RegExp = /^(?<Long>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)[,;]?\s+(?<Lat>-?(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;
const dmsRegExReverse: RegExp = /^(?<dmsLong>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180))(?:(\s?[°d]\s?)|\s)(?<dmsLongMin>[0-5][0-9]|[0-9])(?:(\s?['`"m]\s?)|\s)(?<dmsLongSec>[0-9]|[0-5][0-9])(?:\s?['″"s])?\s?(?<dmsLongDir>[EW])?[,]?\s+(?<dmsLat>-?(?:[0-9]|[1-8][0-9]|90))(?:(\s?[°d]\s?)|\s)(?<dmsLatMin>[0-5][0-9]|[0-9])(?:(\s?['`"m]\s?)|\s)(?<dmsLatSec>[1-5][0-9]|[0-9])(?:\s?['″"s])?\s?(?<dmsLatDir>[NS])?(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;
const dmRegExReverse: RegExp = /^(?<ddmLong>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180))(?:\s?[°d]\s?|\s)(?<ddmLongMin>[0-5]?[0-9](?:\.\d{1,6})?)(?:\s?['"′m]?\s?)(?<ddmLongDir>[EW])?[,;]?\s+(?<ddmLat>-?(?:[0-9]|[1-8][0-9]|90))(?:\s?[°d]\s?|\s)(?<ddmLatMin>[0-5]?[0-9](?:\.\d{1,6})?)(?:\s?['"′m]?\s?)(?<ddmLatDir>[NS])?(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;
const directionRegExReverse: RegExp = /^(?<dirLong>(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)['"]?\s?(?<dirLongDir>[EW])[,;]?\s+(?<dirLat>(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)['"]?\s*(?<dirLatDir>[NS])(?:\s(?<label>[a-zs A-Z\s\d]*))?$/;

export function validator(input: string): Coordinate {
    if (standardRegEx.test(input)) {
        var match = input.match(standardRegEx);
        let lat: point = { value: match.groups.Lat, direction: null };
        let long: point = { value: match.groups.Long, direction: null };
        let label: string = match.groups.label;
        return new Coordinate(lat, long, label);

    } else if (dmsRegEx.test(input)) {
        var match = input.match(dmsRegEx);
        let convertedLat: number = Number(match.groups.dmsLat) + (Number(match.groups.dmsLatMin) / 60) + (Number(match.groups.dmsLatSec) / 3600);
        let convertedLong: number = Number(match.groups.dmsLong) + (Number(match.groups.dmsLongMin) / 60) + (Number(match.groups.dmsLongSec) / 3600);

        let lat: point = { value: convertedLat.toString(), direction: <direction>match.groups.dmsLatDir };
        let long: point = { value: convertedLong.toString(), direction: <direction>match.groups.dmsLongDir };
        let label: string = match.groups.label;

        return new Coordinate(lat, long, label);

    } else if (dmRegEx.test(input)) {
        var match = input.match(dmRegEx);

        let convertedLat: number = Number(match.groups.ddmLat) + (Number(match.groups.ddmLatMin) / 60);
        let convertedLong: number = Number(match.groups.ddmLong) + (Number(match.groups.ddmLongMin) / 60);

        let lat: point = { value: convertedLat.toString(), direction: <direction>match.groups.ddmLatDir };
        let long: point = { value: convertedLong.toString(), direction: <direction>match.groups.ddmLongDir };
        let label: string = match.groups.label;

        return new Coordinate(lat, long, label);

    } else if (directionRegEx.test(input)) {
        var match = input.match(directionRegEx);

        let lat: point = { value: match.groups.dirLat, direction: <direction>match.groups.dirLatDir };
        let long: point = { value: match.groups.dirLong, direction: <direction>match.groups.dirLongDir };
        let label: string = match.groups.label;

        return new Coordinate(lat, long, label);

    } else if (standardRegExReverse.test(input)){
        var match = input.match(standardRegExReverse);

        let lat: point = { value: match.groups.Lat, direction: null };
        let long: point = { value: match.groups.Long, direction: null };
        let label: string = match.groups.label;
       
        return new Coordinate(lat, long, label);
    } else if (dmsRegExReverse.test(input)) {
        var match = input.match(dmsRegExReverse);

        let convertedLat: number = Number(match.groups.dmsLat) + (Number(match.groups.dmsLatMin) / 60) + (Number(match.groups.dmsLatSec) / 3600);
        let convertedLong: number = Number(match.groups.dmsLong) + (Number(match.groups.dmsLongMin) / 60) + (Number(match.groups.dmsLongSec) / 3600);

        let lat: point = { value: convertedLat.toString(), direction: <direction>match.groups.dmsLatDir };
        let long: point = { value: convertedLong.toString(), direction: <direction>match.groups.dmsLongDir };
        let label: string = match.groups.label;

        return new Coordinate(lat, long, label);
    
    } else if (dmRegExReverse.test(input)) {
        var match = input.match(dmRegExReverse);

        let convertedLat: number = Number(match.groups.ddmLat) + (Number(match.groups.ddmLatMin) / 60);
        let convertedLong: number = Number(match.groups.ddmLong) + (Number(match.groups.ddmLongMin) / 60);

        let lat: point = { value: convertedLat.toString(), direction: <direction>match.groups.ddmLatDir };
        let long: point = { value: convertedLong.toString(), direction: <direction>match.groups.ddmLongDir };
        let label: string = match.groups.label;

        return new Coordinate(lat, long, label);

    } else if (directionRegExReverse.test(input)) {
        var match = input.match(directionRegExReverse);

        let lat: point = { value: match.groups.dirLat, direction: <direction>match.groups.dirLatDir };
        let long: point = { value: match.groups.dirLong, direction: <direction>match.groups.dirLongDir };
        let label: string = match.groups.label;

        return new Coordinate(lat, long, label);

    } else {
        return null;
    }
}