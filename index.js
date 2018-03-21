#!/usr/bin/env node

var glob = require("glob")
var fs = require('fs')
var os = require('os')
var pathTool = require('path')

/*
json-flat-select *.json pathToRowMapFile

load file from command line
load map from command line

make it run from command line
*/

function searchAndSelect (map, path, cb) {
  glob(path, function (err, files) {
    if (err) cb(err)

    var selections = [];

    for (var i in files) {
      var data = fs.readFileSync(files[i], 'utf8')
      var obj = {}

      try {
         obj = JSON.parse(data)
      } catch(e) {}

      var _select = select(map, obj)
      _select.file = pathTool.join(process.cwd(),files[i].toString())
      selections.push(_select)
    }
    cb(null, selections)
  })
}

function select (map, obj) {
  var selections = {}

  for (var i in map) {
    if (typeof map[i] === 'object') {
      for (var j in map[i]) {
        selections[i] = pickProperty(JSON.parse(JSON.stringify(obj)), map[i][j])

        if (typeof value !== 'undefined') {
          break
        }
      }
    } else {
      selections[i] = pickProperty(JSON.parse(JSON.stringify(obj)), map[i])
    }
  }

  return selections
}

function flatJsonToTsv (objects , delimiter) {
  // assume all object have same properties
  if (!delimiter) {
    delimiter = '\t'
  }

  var rows = ''

  for (var i in objects[0]) {
    rows += i + delimiter
  }

  rows += os.EOL

  for (var i in objects) {
    for (var j in objects[i]) {
      rows += objects[i][j] + delimiter
    }

    rows += os.EOL
  }

  return rows
}

function pickProperty (obj, path) {
  var sections = path.split('.')

  for (var i in sections) {
    var section = sections[i]
    var index = null

    if (section.indexOf('[') > -1) {
      index = parseInt(section.substring(section.indexOf('[') + 1, section.length - 1))
      section = section.substring(0, section.indexOf('['))
    }

    obj = obj[section]

    if (typeof obj === 'undefined') {
      return obj
    }

    if (index !== null && obj.length && index < obj.length) {
      obj = obj[index]
    }
  }

  return obj
}

if (process.argv.length > 3) {
  //load map
  fs.readFile(process.argv[2], 'utf-8', function(err, data) {
    if (err) throw err

    var map = JSON.parse(data)

    searchAndSelect(map, process.argv[3], function (err, selections) {
      if (err) throw err

      if (process.argv.length > 4 && process.argv[4]) {
        console.log(flatJsonToTsv(selections, process.argv[4]))
      } else {
        console.log(JSON.stringify(selections, null, '\t'))
      }

    })
  })

}

module.exports = searchAndSelect
