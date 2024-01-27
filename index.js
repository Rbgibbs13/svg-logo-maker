const inquirer = require("./node_modules/inquirer");
const Shape = require("./lib/shapes.js");
const Save = require("./lib/save.js");
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
        choices: ["white", "black", "blue", "red", "green", "yellow", "purple", "transparent"],
    },
    {
        name: "borderColor",
        type: "list",
        message: "Select Border and Text Color",
        choices: ["white", "black", "blue", "red", "green", "yellow", "purple"],
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
// const SaveSVGtoFile = (svg) => {
//     fs.writeFile(`./examples/${saveFileName}.svg`, `${svg}`, (error) => 
//         error ? console.error(error) : console.log("SVG Saved")
//     );
// };

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
        const {xSize, ySize, xOffset, yOffset, roundness} = response;
        const rectSVG = new Shape.Rectangle(xSize, ySize, xOffset, yOffset, roundness, data);
        const svg = rectSVG.convertToSVG();
        Save.SaveSVGtoFile(saveFileName, svg);
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
        const {xSize, ySize} = response;
        const triSVG = new Shape.Triangle(xSize, ySize, data);
        const svg = triSVG.convertToSVG();
        Save.SaveSVGtoFile(saveFileName, svg);
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
        const {size, xOffset, yOffset, roundness} = response;
        const sqSVG = new Shape.Square(size, xOffset, yOffset, roundness, data);
        const svg = sqSVG.convertToSVG();
        Save.SaveSVGtoFile(saveFileName, svg);
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
        const {xSize, ySize} = response;
        const ellipseSVG = new Shape.Ellipse(xSize, ySize, data);
        const svg = ellipseSVG.convertToSVG();
        Save.SaveSVGtoFile(saveFileName, svg);
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
        const radius = response.radius;
        const circleSVG = new Shape.Circle(radius, data);
        const svg = circleSVG.convertToSVG();
        Save.SaveSVGtoFile(saveFileName, svg);
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
        },
        {
            name: "fillrule",
            type: "list",
            message: "Select fill type",
            choices: ["nonzero", "evenodd"],
        },
    ]).then((response) => {
        const {xSize, ySize, fillrule} = response;
        const starSVG = new Shape.Star(xSize, ySize, fillrule, data);
        const svg = starSVG.convertToSVG();
        Save(saveFileName, svg);
    });
};