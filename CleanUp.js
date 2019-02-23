const fs = require('fs')

const extractData = path => {
  const data = fs.readFileSync(path)

  return data.toString()
}

/* ASSIGN DATA TO VARIABLES */

const getCoords = data => {
  const coords = data.split(" ")
  return {
    x: parseInt(coords[0]),
    y: parseInt(coords[1])
  }
}

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

/* CHECK FOR CLEAN UPS */

const checkForCleanUps = (hooverMovements, patchesOfDirt) => {
  const matchedPosition = patch => position => patch.x === position.x && patch.y === position.y
  const hasBeenHoovered = patch => hooverMovements.filter(matchedPosition(patch)).length > 0

  return patchesOfDirt.filter(hasBeenHoovered).length
}

/* DISPLAY RESULTS */

const getFinalPosition = hooverMovements => {
  const last = hooverMovements.length - 1
  return hooverMovements[last]
}

const displayResults = (testNumber, finalPosition, numberOfCleanUps) => {
  console.log("Results for input00" + testNumber + ":")
  console.log(finalPosition.x + " " + finalPosition.y)
  console.log(numberOfCleanUps)
}

/* EXECUTION AND TEST OTHER INPUT FILES */

const cleanUp = (path, testNumber) => {
  const cleanUpData = extractData(path)

  const rows = cleanUpData.split("\n")

  const roomDimensions = getCoords(rows[0])

  const hooverPosition = getCoords(rows[1])

  const patchesOfDirtRows = rows.slice(2, -1)
  const patchesOfDirt = patchesOfDirtRows.map(getCoords)

  const last = rows.length - 1
  const instructions = rows[last].split("")

  const hooverMovements = moveHoover(roomDimensions, hooverPosition, instructions)

  const numberOfCleanUps = checkForCleanUps(hooverMovements, patchesOfDirt)

  const finalPosition = getFinalPosition(hooverMovements)

  displayResults(testNumber, finalPosition, numberOfCleanUps)
}

const inputs = ['./input001.txt', './input002.txt', './input003.txt']

const cleanUpAll = inputs => inputs.map((input, index) => cleanUp(input, index + 1))

cleanUpAll(inputs)

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