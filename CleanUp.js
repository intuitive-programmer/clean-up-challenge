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

const moveHoover = (roomDimensions, initialPosition, instructions) => {
  let currentPosition = initialPosition

  return instructions.map(instruction => {
    const nextPosition = moveToNextPosition(currentPosition, instruction)

    const valid = checkMoveValidity(roomDimensions, nextPosition)

    if (valid) {
      currentPosition = nextPosition
      return currentPosition
    }

    return currentPosition
  })
}

const moveToNextPosition = (currentPosition, instruction) => {
  switch (instruction) {
    case "N":
      return { ...currentPosition, y: currentPosition.y + 1 }
    case "S":
      return { ...currentPosition, y: currentPosition.y - 1 }
    case "W":
      return { ...currentPosition, x: currentPosition.x - 1 }
    case "E":
      return { ...currentPosition, x: currentPosition.x + 1 }
    default:
      return currentPosition
  }
}

const checkMoveValidity = (roomDimensions, currentPosition) => {
  if (currentPosition.x >= 0 && currentPosition.x <= roomDimensions.x && currentPosition.y >= 0 && currentPosition.y <= roomDimensions.y) {
    return true
  } else {
    return false
  }
}

const hooverMovements = moveHoover(roomDimensions, hooverPosition, instructions)

/* CHECK FOR CLEAN UPS */

const checkForCleanUps = (hooverMovements, patchesOfDirt) => {
  const matchedPosition = patch => position => patch.x === position.x && patch.y === position.y
  const hasBeenHoovered = patch => hooverMovements.filter(matchedPosition(patch)).length > 0

  return patchesOfDirt.filter(hasBeenHoovered).length
}

const numberOfCleanUps = checkForCleanUps(hooverMovements, patchesOfDirt)

/* DISPLAY RESULTS */

const getFinalPosition = hooverMovements => {
  const last = hooverMovements.length - 1
  return hooverMovements[last]
}

const finalPosition = getFinalPosition(hooverMovements)

const displayResults = (finalPosition, numberOfCleanUps) => {
  console.log(finalPosition.x + " " + finalPosition.y)
  console.log(numberOfCleanUps)
}

displayResults(finalPosition, numberOfCleanUps)

/* EXPORT FUNCTIONS FOR UNIT TESTING */

module.exports = {
  extractData,
  getCoords,
  moveHoover,
  moveToNextPosition,
  checkMoveValidity,
  checkForCleanUps,
  getFinalPosition
}