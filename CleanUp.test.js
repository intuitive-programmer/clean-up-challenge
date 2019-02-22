const { extractData } = require("./CleanUp")

test("extractData returns a string", () => {
  expect(typeof extractData("./input001.txt")).toBe("string")
})