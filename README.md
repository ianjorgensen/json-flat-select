# JSON select to CSV

Map deep json structures selectively to a flat object. Root object needs to be an object not an array. Can be called in command line to and supports parsing flat file to csv

## Install
```sh
npm install -g json-flat-select
```

## Map.json

```json
{
  "name": "name", //address a root property
  "age": "info.more.age" // access sub property, '' if not defined
  "result1": "results[0].value" // access index, '' if out of range
  "resultFallback": ["results[0].value","results[0].error"] // if not defined will attempt to resolve second
}
```

## Command Line Usage

```sh
json-flat-select ./**/*.json pathToRowMapFile > data.json
json-flat-select ./**/*.json pathToRowMapFile ',' > data.csv
json-flat-select ./**/*.json pathToRowMapFile '\t' > data.tsv
```


## Module Usage

```js
var jsonFlatSelect = require('json-flat-select')
var rowMap = require('PUT_PATH_TO_ROW_MAP_HERE.json')

var csvTable = jsonFlatSelect('*.json', rowMap)
```


## Test

```js
npm test
```
