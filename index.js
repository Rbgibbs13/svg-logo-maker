const inquirer = require("./node_modules/inquirer");
const Shape = require("./lib/shapes.js");
const Save = require("./lib/save.js");
let saveFileName = "";

inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "SVG Logo Text - 3 letter max",
        filter: (result) => { 
            if(result.length > 3) return result.substring(0,3).toUpperCase(); 
            else return result.toUpperCase();
        },
    },
    {
        name: "shape",
        type: "list",
        message: "Select Logo Shape",
        choices: ["Rectangle", "Circle", "Triangle", "Square", "Ellipse", "Star"],
    },
    {
        name: "color",
        type: "input",
        message: "Background : Input Color (red, green, etc...) or Hex(#3386FF)",
        default: "#1D428A",
        filter: (result) => {
            if(result[0] == "#") {
                return result.substring(0,7).toUpperCase();
            } else {
                return result.toLowerCase();
            }
        }
    },
    {
        name: "borderColor",
        type: "input",
        message: "Border and Text Color : Input Color (red, green, etc...) or Hex(#3386FF)",
        default: "#FFC72C",
        filter: (result) => {
            if(result[0] == "#") {
                return result.substring(0,7).toUpperCase();
            } else {
                return result.toLowerCase();
            }
        }
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
    saveFileName = response.saveName + "-logo";

    //Generate SVG shape
    switch(response.shape) {
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
            message: "X Offset of Text (1/4 of WIDTH to center)",
            default: "10",
        },
        {
            name: "yOffset",
            type: "number",
            message: "Y Offset of Text (1/2 of HEIGHT to center)",
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
        Save(saveFileName, svg);
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
        Save(saveFileName, svg);
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
            message: "X Offset of Text",
            default: "10",
        },
        {
            name: "yOffset",
            type: "number",
            message: "Y Offset of Text (5/8 of HEIGHT to center)",
            default: "250",
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
        Save(saveFileName, svg);
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
        Save(saveFileName, svg);
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
        Save(saveFileName, svg);
    });
};

const generateStar = (data) => {
    inquirer.prompt([
        {
            name: "useColorSelector",
            type: "confirm",
            message: "Use Complex Colors?",
        },
    ]).then((response) => {
        const useColorSelector = response.useColorSelector;
        if(useColorSelector == true || useColorSelector == "Yes" || useColorSelector == "yes") {
            generateStarComplex(data);
        } else {
            generateStarBasic(data);
        };
    })
};

const generateStarBasic = (data) => {
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

const generateStarComplex = (data) => {
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
        {
            name: "backgroundRGB",
            type: "input",
            message: "Background RGB Value : Seperate with commas (r, g, b)",
        },
        {
            name: "textRGB",
            type: "input",
            message: "Text/Border RGB Value : Seperate with comma (r, g, b)",
        }
    ]).then((response) => {
        const {xSize, ySize, fillrule, textRGB, backgroundRGB} = response;
        //split rgb at commas, if theres not 3 values try splitting at space
        const bVals = backgroundRGB.split(",");
        if(bVals.length < 3 || bVals.length > 3) bVals = backgroundRGB.split(" ");
        const colorBuild = convertRGB(bVals[0], bVals[1], bVals[2]);
        data.color = colorBuild;

        const tVals = textRGB.split(",");
        if(tVals.length < 3 || tVals.length > 3) tVals = textRGB.split(" ");
        const textBuild = convertRGB(tVals[0], tVals[1], tVals[2]);
        data.borderColor = textBuild;
        
        const starSVG = new Shape.Star(xSize, ySize, fillrule, data);
        const svg = starSVG.convertToSVG();
        Save(saveFileName, svg);
    });
};

const convertRGB = (r, g, b) => {
    let build = "#";
    let redVal = returnHex(Math.floor(r/16));
    let redRemain = returnHex((r % 16) * 16);
    build += redVal + redRemain;

    let greenVal = returnHex(Math.floor(g/16));
    let greenRemain = returnHex((g % 16) * 16);
    build += greenVal + greenRemain;

    let blueVal = returnHex(Math.floor(b/16));
    let blueRemain = returnHex((b % 16) * 16);
    build += blueVal + blueRemain;
    return build;
};

const returnHex = (value) => {
    let hexValue;
    switch(value) {
        case 1:
            hexValue = "1";
            break;

        case 2:
            hexValue = "2";
            break;

        case 3:
            hexValue = "3";
            break;
            
        case 4:
            hexValue = "4";
            break;

        case 5:
            hexValue = "5";
            break;

        case 6:
            hexValue = "6";
            break;

        case 7:
            hexValue = "7";
            break;

        case 8:
            hexValue = "8";
            break;
            
        case 9:
            hexValue = "9";
            break;

        case 10:
            hexValue = "A";
            break;

        case 11:
            hexValue = "B";
            break;

        case 12:
            hexValue = "C";
            break;

        case 13:
            hexValue = "D";
            break;

        case 14:
            hexValue = "E";
            break;

        case 15:
            hexValue = "F";
            break;

        default:
            hexValue = "1";
    }

    return hexValue;
}