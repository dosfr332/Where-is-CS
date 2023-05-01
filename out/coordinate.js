"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordinate = void 0;
class Coordinate {
    constructor(lat, long, label) {
        this.lat = lat;
        this.long = long;
        this.label = label;
    }
    format() {
    }
    openMap() {
    }
    toString() {
        let completeObject = { lat: this.lat, long: this.long, label: this.label };
        return JSON.stringify(completeObject, null, 4);
    }
}
exports.Coordinate = Coordinate;
//# sourceMappingURL=coordinate.js.map