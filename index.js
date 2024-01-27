const inquirer = require("./node_modules/inquirer");
const fs = require("fs");
const Shape = require("./lib/shapes.js");
let saveFileName = "";

// async function titleFilter(title) {
//     var done = this.async;
//     setTimeout(function() {
//         if(title.length >= 3) {
//             title = title.substring(0,3).toUpperCase();
//             console.warn("Filter Working");
//             done("Max length reached");
//             return;
//         }
//         console.warn("Filter Timed Out");
//         done(null, true);
//     }, 3000);
    
//     console.warn("Filter Working");
// };

inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "SVG Logo Text - 3 letter max",
        //Add filter here
        //filter: titleFilter(this.title),
    },
    {
        name: "shape",
        type: "list",
        message: "Select Logo Shape",
        choices: ["Rectangle", "Circle", "Triangle", "Square", "Ellipse", "Star"],
    },
    {
        name: "color",
        type: "list",
        message: "Select Logo Background Color",
        choices: ["white", "black", "blue", "red", "green", "yellow", "transparent"],
    },
    {
        name: "borderColor",
        type: "list",
        message: "Select Border and Text Color",
        choices: ["white", "black", "blue", "red", "green", "yellow"],
    },
    {
        name: "strokeWidth",
        type: "number",
        message: "Select Border Width",
        default: "5",
    },
    {
        name: "saveName",
        type: "input",
        message: "Name for file",
        default: "svg-test",
    }
]).then((response) => {
    //Get Inputs
    let {title, shape, saveName} = response;
    
    //sanitize
    title = title.substring(0,3).toUpperCase();
    saveFileName = saveName + "-logo";
    response.title = title;
    console.log(response.title + " :  " + title);

    //Generate SVG shape
    switch(shape) {
        case "Circle":
            generateCircle(response);
            break;

        case "Ellipse":
            generateEllipse(response);
            break;

        case "Rectangle":
            generateRect(response);
            break;

        case "Triangle":
            generateTriangle(response);
            break;

        case "Square":
            generateSquare(response);
            break;

        case "Star":
            generateStar(response);
            break;

        default:
            generateSquare(response);
    }
});

 //Save To File
const SaveSVGtoFile = (svg) => {
    fs.writeFile(`./examples/${saveFileName}.svg`, `${svg}`, (error) => 
        error ? console.error(error) : console.log("SVG Saved")
    );
};

const generateRect = (data) => {
    //roundness : sizeX : sizeY 
    inquirer.prompt([
        {
            name: "xSize",
            type: "number",
            message: "Width of SVG Logo",
            default: "400",
        },
        {
            name: "ySize",
            type: "number",
            message: "Height of SVG Logo",
            default: "200",
        },
        {
            name: "xOffset",
            type: "number",
            message: "X Offset of Text (X Margin for your logo)",
            default: "10",
        },
        {
            name: "yOffset",
            type: "number",
            message: "Y Offset of Text (Y Margin for your logo)",
            default: "10",
        },
        {
            name: "roundness",
            type: "number",
            message: "Border radius (Edge Roundness)",
            default: "10",
        }
    ]).then((response) => {
        let {xSize, ySize, xOffset, yOffset, roundness} = response;
        let rectSVG = new Shape.Rectangle(xSize, ySize, xOffset, yOffset, roundness, data);
        let svg = rectSVG.convertToSVG();
        SaveSVGtoFile(svg);
    });
};

const generateTriangle = (data) => {
    inquirer.prompt([
        {
            name: "xSize",
            type: "number",
            message: "Width of SVG Logo",
            default: "400",
        },
        {
            name: "ySize",
            type: "number",
            message: "Height of SVG Logo",
            default: "400",
        },
    ]).then((response) => {
        let {xSize, ySize} = response;
        let triSVG = new Shape.Triangle(xSize, ySize, data);
        let svg = triSVG.convertToSVG();
        SaveSVGtoFile(svg);
    });
};

const generateSquare = (data) => {
    inquirer.prompt([
        {
            name: "size",
            type: "number",
            message: "Width and Height of SVG Logo",
            default: "400",
        },
        {
            name: "xOffset",
            type: "number",
            message: "X Offset of Text (X Margin for your logo)",
            default: "10",
        },
        {
            name: "yOffset",
            type: "number",
            message: "Y Offset of Text (Y Margin for your logo)",
            default: "10",
        },
        {
            name: "roundness",
            type: "number",
            message: "Border radius (Edge Roundness)",
            default: "50",
        }
    ]).then((response) => {
        let {size, xOffset, yOffset, roundness} = response;
        let sqSVG = new Shape.Square(size, xOffset, yOffset, roundness, data);
        let svg = sqSVG.convertToSVG();
        SaveSVGtoFile(svg);
    });
};

const generateEllipse = (data) => {
    inquirer.prompt([
        {
            name: "xSize",
            type: "number",
            message: "Width of SVG Logo",
            default: "400",
        },
        {
            name: "ySize",
            type: "number",
            message: "Height of SVG Logo",
            default: "200",
        }
    ]).then((response) => {
        let {xSize, ySize} = response;
        let ellipseSVG = new Shape.Ellipse(xSize, ySize, data);
        let svg = ellipseSVG.convertToSVG();
        SaveSVGtoFile(svg);
    });
};

const generateCircle = (data) => {
    //radius
    inquirer.prompt([
        {
            name: "radius",
            type: "number",
            message: "Circle radius",
            default: "400",
        },
    ]).then((response) => {
        let radius = response.radius;
        let circleSVG = new Shape.Circle(radius, data);
        let svg = circleSVG.convertToSVG();
        SaveSVGtoFile(svg);
    });
};

const generateStar = (data) => {
    inquirer.prompt([
        {
            name: "xSize",
            type: "number",
            message: "Width of SVG Logo",
            default: "400",
        },
        {
            name: "ySize",
            type: "number",
            message: "Height of SVG Logo",
            default: "400",
        }
    ]).then((response) => {
        let {xSize, ySize} = response.radius;
        let starSVG = new Shape.Star(xSize, ySize, data);
        let svg = starSVG.convertToSVG();
        SaveSVGtoFile(svg);
    });
};