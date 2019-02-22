const {
  extractData,
  getCoords
} = require("./CleanUp")

test("extractData returns a string", () => {
  expect(typeof extractData("./input001.txt")).toBe("string")
})

test("getCoords returns an object with x and y coordinates", () => {
  expect(getCoords("2 3")).toMatchObject({ x: 2, y: 3 })
})