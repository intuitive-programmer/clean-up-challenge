const {
  extractData,
  getCoords,
  moveHoover,
  moveToNextPosition,
  checkMoveValidity,
  checkForCleanUps,
  getFinalPosition
} = require("./CleanUp")

test("extractData returns a string", () => {
  expect(typeof extractData("./input001.txt")).toBe("string")
})

test("getCoords returns an object with x and y coordinates", () => {
  expect(getCoords("2 3")).toMatchObject({ x: 2, y: 3 })
})

test("hoover moves from coordinates { x: 0, y: 0 } to { x: 0, y: 0 } with instructions [ 'N', 'E', 'S', 'W' ] and returns an array of all movements", () => {
  expect(moveHoover({ x: 5, y: 5}, { x: 0, y: 0 }, [ 'N', 'E', 'S', 'W' ])).toMatchObject([{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 }])
})

test("the instruction 'N' adds 1 to the Y coordinate", () => {
  expect(moveToNextPosition({ x: 0, y: 0 }, "N")).toMatchObject({ x: 0, y: 1 })
})

test("the instruction 'S' subtracts 1 from the Y coordinate", () => {
  expect(moveToNextPosition({ x: 0, y: 5 }, "S")).toMatchObject({ x: 0, y: 4 })
})

test("the instruction 'W' subtracts 1 to the X coordinate", () => {
  expect(moveToNextPosition({ x: 5, y: 0 }, "W")).toMatchObject({ x: 4, y: 0 })
})

test("the instruction 'E' adds 1 from the X coordinate", () => {
  expect(moveToNextPosition({ x: 0, y: 0 }, "E")).toMatchObject({ x: 1, y: 0 })
})

test("an invalid instruction returns original coordinates", () => {
  expect(moveToNextPosition({ x: 0, y: 0 }, "Z")).toMatchObject({ x: 0, y: 0 })
})

test("hoover movement remains inside roomDimensions", () => {
  expect(checkMoveValidity({ x: 5, y: 5 }, { x: 0, y: 0 })).toBe(true)
  expect(checkMoveValidity({ x: 5, y: 5 }, { x: 5, y: 5 })).toBe(true)
  expect(checkMoveValidity({ x: 5, y: 5 }, { x: 2, y: 2 })).toBe(true)
  expect(checkMoveValidity({ x: 5, y: 5 }, { x: -1, y: 1 })).toBe(false)
  expect(checkMoveValidity({ x: 5, y: 5 }, { x: 1, y: -1 })).toBe(false)
  expect(checkMoveValidity({ x: 5, y: 5 }, { x: 1, y: 6 })).toBe(false)
  expect(checkMoveValidity({ x: 5, y: 5 }, { x: 6, y: 1 })).toBe(false)
})

test("check if hoover cleans any dirt patches during it's movements and returns an integer", () => {
  expect(checkForCleanUps([{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }], [])).toBe(0)
  expect(checkForCleanUps([{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }], [{ x: 1, y: 5 }])).toBe(0)
  expect(checkForCleanUps([{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }], [{ x: 3, y: 3 }])).toBe(1)
})

test("check final movement of [{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }] is { x: 4, y: 3 }", () => {
  expect(getFinalPosition([{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }])).toMatchObject({ x: 4, y: 3 })
})
