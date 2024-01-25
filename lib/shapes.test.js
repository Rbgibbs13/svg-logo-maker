const Shape = require("./shapes");

describe("Shape", () => {
    test("Generate shape with area of 25 and perimeter of 25", () => {

        const nShape = new Shape(25, 25);
        expect(nShape.area).toBe(25);
        expect(nShape.perimeter).toBe(25);
    })
})
