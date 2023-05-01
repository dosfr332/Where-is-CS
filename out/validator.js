"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const coordinate_1 = require("./coordinate");
const standardRegEx = /^(?<Lat>-?(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)[,;]?\s(?<Long>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)(?<label>\s[a-zs A-Z\s]*)?$/;
const dmsRegEx = /^(?<dmsLat>-?(?:[0-9]|[1-8][0-9]|90))(?:[°d]\s?|\.)(?<dmsLatMin>[0-5][0-9]|[0-9])(?:['"m]\s?|\.)(?<dmsLatSec>[0-5][0-9]|[0-9])(?:['"s]\s?|)(?<dmsLatDir>[NS])?,?\s+(?<dmsLong>-?(?:[0-9]|[1-8][0-9]|90))(?:[°d]\s?|\.)(?<dmsLongMin>[0-5][0-9]|[0-9])(?:['"m]\s?|\.)(?<dmsLongSec>[0-9]|[0-5][0-9])(?:['"s]\s?|)(?<dmsLongDir>[EW])?(?<label>\s[a-zs A-Z\s]*)?$/;
const dmRegEx = /^(?<ddmLat>-?(?:[0-9]|[1-8][0-9]|90))[°d]\s*(?<ddmLatMin>[0-5]?[0-9](?:\.\d{1,6})?)['′m]?\s*(?<ddmLatDir>[NS])?,?\s*(?<ddmLong>-?(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180))(?:[°d]\s*(?<ddmLongMin>[0-5]?[0-9](?:\.\d{1,6})?)['′m]?\s*(?<ddmLongDir>[EW])?)?(?<label>\s[a-zs A-Z\s]*)?$/;
const directionRegEx = /^(?<dirLat>(?:[0-9]|[1-8][0-9]|90)(?:\.\d{1,6})?)['"]?\s*(?<dirLatDir>[NS]),?\s*(?<dirLong>(?:[0-9]|[1-9][0-9]|1[0-7][0-9]|180)(?:\.\d{1,6})?)['"]?\s?(?<dirLongDir>[EW])(?<label>\s[a-zs A-Z\s]*)?$/;
function validator(input) {
    if (standardRegEx.test(input)) {
        var match = input.match(standardRegEx);
        let lat = { value: match.groups.Lat, direction: null };
        let long = { value: match.groups.Long, direction: null };
        let label = match.groups.label;
        return new coordinate_1.Coordinate(lat, long, label);
    }
    else if (dmsRegEx.test(input)) {
        var match = input.match(dmsRegEx);
        let convertedLat = Number(match.groups.dmsLat) + (Number(match.groups.dmsLatMin) / 60) + (Number(match.groups.dmsLatSec) / 3600);
        let convertedLong = Number(match.groups.dmsLong) + (Number(match.groups.dmsLongMin) / 60) + (Number(match.groups.dmsLongSec) / 3600);
        let lat = { value: convertedLat.toString(), direction: match.groups.dmsLatDir };
        let long = { value: convertedLong.toString(), direction: match.groups.dmsLongDir };
        let label = match.groups.label;
        return new coordinate_1.Coordinate(lat, long, label);
    }
    else if (dmRegEx.test(input)) {
    }
    else if (directionRegEx.test(input)) {
    }
    else {
        return null;
    }
}
exports.validator = validator;
//# sourceMappingURL=validator.js.map