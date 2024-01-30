const Shape = require("./shapes");

describe("Shape", () => {
    test("Generate Shape with title, color, border color, and border width(stroke width)", () => {
        const title = "GBG";
        const color = "blue";
        const borderColor = "black";
        const nShape = new Shape.Shape(title, color, borderColor, 5);
        expect(nShape.title).toBe(title) && expect(nShape.color).toBe(color)
        && expect(nShape.borderColor).toBe(borderColor) && expect(nShape.strokeWidth).toEqual(5);
    });
});

describe("Square", () => {
    test("The width & height of square should be set when constructed", () => {
        const data = {
            title: "GBG",
            color: "white",
            borderColor: "red",
            strokeWidth: 10,
        };

        const sizeX = 100;
        const square = new Shape.Square(sizeX, 0, 0, 10, data);
        expect(square.sizeX).toEqual(sizeX);
    });

    test("The roundess of the square edges should be set when constructed", () => {
        const data = {
            title: "GBG",
            color: "blue",
            borderColor: "black",
            strokeWidth: 10,
        };
        const roundess = 20;
        const square = new Shape.Square(100, 0, 0, roundess, data);
        expect(square.roundness).toEqual(roundess);
    });

    describe("convertToSVG", () => {
        test("Convert Square to SVG Text file", () => {
            const data = {
                title: "GBG",
                color: "blue",
                borderColor: "red",
                strokeWidth: 10,
            };

            const sizeX = 200;
            const xOffset = 80;
            const yOffset = 80;
            const roundness = 20;
            const square = new Shape.Square(sizeX, xOffset, yOffset, roundness, data);
            
            expect(square.convertToSVG()).toEqual(
`<svg height="${sizeX}" width="${sizeX}" xmlns="${"http://www.w3.org/2000/svg"}" version="1.1">
    <rect x="${data.strokeWidth}" y="${data.strokeWidth}" rx="${roundness}" ry="${roundness}" width="${sizeX-data.strokeWidth*2}" height="${sizeX-data.strokeWidth*2}" fill="${data.color}" stroke="${data.borderColor}" stroke-width="${data.strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${data.borderColor}" x="${xOffset}" y="${yOffset}">${data.title}</tspan></text>
    <style>
        text {
            font: ${(sizeX/5)*2}px Verdana, Helvetica, Arial, sans-serif;
        }
    </style>
</svg>`);
            console.log("Test ran through convert function");
        });
    })
});

describe("Triangle", () => {
    test("The x size and y size of the triangle should be 200", () => {
        const data = {
            title: "GBG",
            color: "green",
            borderColor: "red",
            strokeWidth: 5,
        };

        const sizeX = 200;
        const sizeY = 200;
        const triangle = new Shape.Triangle(sizeX, sizeY, data);
        expect(triangle.sizeX).toEqual(sizeX) && expect(triangle.sizeY).toEqual(sizeY);
    });

    describe("convertToSVG", () => {
        test("Generate Triangle SVG Text file", () => {
            const data = {
                title: "GBG",
                color: "green",
                borderColor: "white",
                strokeWidth: 5,
            };
    
            const sizeX = 200;
            const sizeY = 200;
            const triangle = new Shape.Triangle(sizeX, sizeY,data);
            expect(triangle.convertToSVG()).toEqual(
`<svg height="${sizeX}" width="${sizeY}" xmlns="${"http://www.w3.org/2000/svg"}" version="1.1">
    <polygon points="${sizeX*0.5},${triangle.strokeWidth} ${sizeX-triangle.strokeWidth},${sizeY-triangle.strokeWidth} ${triangle.strokeWidth},${sizeY-triangle.strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${triangle.borderColor}" x="${sizeX*0.25}" y="${sizeY*0.7}">${triangle.title}</tspan></text>
    <style>
        text {
            font: ${triangle.sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
        }
        polygon {
            fill:${triangle.color};
            stroke:${triangle.borderColor};
            stroke-width:${triangle.strokeWidth};
        }
    </style>
</svg>`);
        });
    })
});

describe("Circle", () => {
    test("The radius of the Circle should be 100", () => {
        const data = {
            title: "GBG",
            color: "green",
            borderColor: "red",
            strokeWidth: 5,
        };

        const radius = 100;
        const circle = new Shape.Circle(radius, data);
        expect(circle.radius).toEqual(radius);
    });

    describe("convertToSVG", () => {
        test("Convert Circle to SVG Text File", () => {
            const data = {
                title: "GBG",
                color: "green",
                borderColor: "red",
                strokeWidth: 5,
            };

            
            const radius = 100;
            let fontSize = radius*0.3;
            let x = fontSize*0.458;
            let y = fontSize*2;
            const circle = new Shape.Circle(radius, data);
            expect(circle.convertToSVG()).toEqual(
`<svg width="${radius}" height="${radius}" xmlns="${"http://www.w3.org/2000/svg"}" version="1.1">
    <circle cx="${radius/2}" cy="${radius/2}" r="${radius*0.4}" fill="${circle.color}" stroke="${circle.borderColor}" stroke-width="${circle.strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${circle.borderColor}" x="${x}" y="${y}">${circle.title}</tspan></text>
    <style>
        text{
                font: ${fontSize}px Verdana, Helvetica, Arial, sans-serif;
            }
    </style>
</svg>`);
        });
    });
});

describe("Rectangle", () => {
    test("The size of the rectangle should be set when constructed", () => {
        const data = {
            title: "GBG",
            color: "red",
            borderColor: "green",
            strokeWidth: 10,
        };

        const sizeX = 400;
        const sizeY = 200;
        const xOffset = 0;
        const yOffset = 0;
        const roundess = 20;
        const rect = new Shape.Rectangle(sizeX, sizeY, xOffset, yOffset, roundess, data);
        expect(rect.sizeX).toEqual(sizeX) && expect(rect.sizeY).toEqual(sizeY);
    });
});

describe("Ellipse", () => {
    test("The size of the Ellipse should be set when constructed", () => {
        const data = {
            title: "GBG",
            color: "white",
            borderColor: "red",
            strokeWidth: 10,
        };
        const sizeX = 400;
        const sizeY = 400;
        const ellipse = new Shape.Ellipse(sizeX, sizeY, data);
        expect(ellipse.sizeX).toEqual(sizeX) && expect(ellipse.sizeY).toEqual(sizeY);
    });
});

describe("Star", () => {
    test("The star properties should be set when constructed", () => {
        const data = {
            title: "SVG",
            color: "black",
            borderColor: "red",
            strokeWidth: 10,
        };
        const sizeX = 400;
        const sizeY = 400;
        const fillRule = "evenodd";
        const star = new Shape.Star(sizeX, sizeY, fillRule, data);
        expect(star.sizeX).toEqual(sizeX) && expect(star.sizeY).toEqual(star.sizeY) && expect(star.fillRule).toBe(fillRule);
    });
});