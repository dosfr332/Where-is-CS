# Where in the world is CS?


## Description 
This is a coordinate parser and validator. It also has capability to convert to GeoJSON format and then open a map with the entered coordinates.

## Installation
To run the code you will need any version of node installed, this can be installed [here](https://nodejs.org/en/download) if you don't have it currently.
Once you have node installed, you can run the following command to install the dependencies:
```
$ npm ci
```
this will run a clean-install and download the dependencies in the `package.json` file

Once the dependencies have been install you can use the pre-configured npm scripts to compile and run the project. The codebase is written in TypeScript and will compile down to CommonJS to run in node. To compile run the command:
```
$ npm run ts
```

Once the project has been compiled you can run it using the command:
```
$ npm run start
```
## Usage
The project reads in coordinates from stdin in a number of different forms, including:
- standard form
- dms form
- dm decimal form

Each form can be either have either +/- markers or NESW markers. and can be interpreted as lat or long first.
>Note: In the case when both of the coordinate values are valid as both latitude and longitude the first number will be considered as latitude and the second ad longitude.

There are a number of commands that can be used to manipulate/display the coordinates.
- clear - This will clear all coordinates that have been entered so far
- print - this will print limited information about the points that have been entered
- map - This will open a browser window and show the points on a map using the [GeoJSON website](https://geojson.io)
- line - Will create a line between two points
  - no flag - This will remove the last two points and transform them into a line
  - -n flag - This will accept two new points as the start and end of the line. 
  - e.g `> line -n` or just `> line`
- poly - Will create a polygon between any number of points (at least 3).
  - no flag - This will remove all entered points and form them into a polygon.
  - -n flag - This will accept any number of new points (at least 3) and can be closed using the `close` command.
