const Shape = require("./shapes");

describe("Shape", () => {
    test("Generate shape", () => {
        const nShape = new Shape.Shape("GBG", "blue", "black", 5);
        expect(nShape.title).toBe("GBG");
        expect(nShape.color).toBe("blue");
    });
})

describe("Square", () => {
    test("The width & height of square should be set when constructed", () => {
        const data = {
            title: "GBG",
            color: "white",
            borderColor: "red",
            strokeWidth: 10,
        };
        const square = new Shape.Square(100, 0, 0, 10, data);
        expect(square.sizeX).toEqual(100);
    });

    test("The roundess of the square edges should be set when constructed", () => {
        const data = {
            title: "GBG",
            color: "blue",
            borderColor: "black",
            strokeWidth: 10,
        };
        const square = new Shape.Square(100, 0, 0, 20, data);

        expect(square.roundness).toEqual(20);
    });

    describe("convertToSVG", () => {
        test("Generates SVG text file", () => {
            // const square = new Square(100, 0, 0, 10, null);
            // expect()
            console.log("Test ran through convert function");
        });
    })
})

// describe("Rectangle", () => {
//     test("", () => {

//     })
// })

// describe("Triangle", () => {
//     test("", () => {

//     })
// })

// describe("Circle", () => {
//     test("", () => {

//     })
// })

// describe("Ellipse", () => {
//     test("", () => {

//     })
// })

// describe("Star", () => {
//     test("", () => {

//     })
// })