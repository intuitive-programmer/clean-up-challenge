const fs = require('fs')

const extractData = path => {
  const data = fs.readFileSync(path)

  return data.toString()
}

const cleanUpData = extractData('./input001.txt')

/* ASSIGN DATA TO VARIABLES */

const getCoords = data => {
  const coords = data.split(" ")
  return {
    x: parseInt(coords[0]),
    y: parseInt(coords[1])
  }
}

const rows = cleanUpData.split("\n")

const roomDimensions = getCoords(rows[0])

const hooverPosition = getCoords(rows[1])

const patchesOfDirtRows = rows.slice(2, -1)
const patchesOfDirt = patchesOfDirtRows.map(getCoords)

const last = rows.length - 1
const instructions = rows[last].split("")

console.log(roomDimensions, hooverPosition, patchesOfDirt, instructions)

 module.exports = {
  extractData,
  getCoords
}