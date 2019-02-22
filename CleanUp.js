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

/* MOVE HOOVER */

const moveHoover = (initialPosition, instructions) => {
  let currentPosition = initialPosition

  return instructions.map(instruction => {
    currentPosition = moveToNextPosition(currentPosition, instruction)
    
    return currentPosition
  })
}

const moveToNextPosition = (currentPosition, instruction) => {
  switch (instruction) {
    case "N":
      return {...currentPosition, y: currentPosition.y + 1}
    case "S":
      return {...currentPosition, y: currentPosition.y - 1}
    case "W":
      return {...currentPosition, x: currentPosition.x -1}
    case "E":
      return {...currentPosition, x: currentPosition.x + 1}
    default:
      return currentPosition
  }
}

const hooverMovements = moveHoover(hooverPosition, instructions)

console.log(hooverMovements)

 module.exports = {
  extractData,
  getCoords,
  moveHoover,
  moveToNextPosition
}