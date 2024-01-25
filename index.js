const inquirer = require("./node_modules/inquirer");
const fs = require("fs");
const Shape = require("./lib/shapes.js");
const Circle = require("./lib/shapes.js");

let saveFileName = "";

inquirer.prompt([
    {
        name: "title",
        type: "input",
        message: "SVG Logo Title - 3 characters Max",
        //Add filter here
    },
    {
        name: "shape",
        type: "list",
        message: "Select Logo Shape",
        choices: ["Rectangle", "Circle", "Ellipse", "Triangle", "Square"],
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
        choices: ["white", "black", "blue", "red", "green", "yellow", "transparent"],
    },
    {
        name: "strokeWidth",
        type: "number",
        message: "Select Border Width",
        default: "5",
    },
    {
        name: "xOffset",
        type: "number",
        message: "X Offset of Text Logo (X Margin for your logo)",
        default: "10",
    },
    {
        name: "yOffset",
        type: "number",
        message: "Y Offset of Text Logo (Y Margin for your logo)",
        default: "10",
    },
    {
        name: "saveName",
        type: "input",
        message: "Name of File",
        default: "svg-test",
    }
    // {
    //     name: "xSize",
    //     type: "number",
    //     message: "Width of SVG Logo",
    //     default: "200",
    // },
    // {
    //     name: "ySize",
    //     type: "number",
    //     message: "Height of SVG Logo",
    //     default: "200",
    // },
    // {
    //     name: "roundness",
    //     type: "number",
    //     message: "Input a border radius (Edge Roundness)",
    //     default: "10",
    // }
]).then((response) => {
    //Get Inputs
    let {title, shape, saveName} = response;
    
    //sanitize this
    title = title.substring(0,3).toUpperCase();
    saveFileName = saveName + "-";
    response.title = title;
    console.log(response.title);
    // let nShape = new Shape.Shape(color, bordercolor, strokeWidth, xOffset, yOffset);

    //Generate SVG shape
    switch(shape) {
        case "Circle":
            console.log("Circle Selected" + response.borderColor);
            generateCircle(response);
            return;

        case "Rectangle":
            console.log("Rectangle Selected");
            generateRect(response);
    }
});

 //Save To File
const SaveSVGtoFile = (svg) => {
    //let svg = `${title} ${shape} ${color}`;
    let rand = Math.floor(Math.random() * 1000);
    let fileName = saveFileName + rand;
    fs.writeFile(`./examples/${fileName}.svg`, `${svg}`, (error) => 
        error ? console.error(error) : console.log("SVG Saved")
    );
}

const generateRect = (data) => {
    //roundness : sizeX : sizeY 
    inquirer.prompt([
        {
            name: "xSize",
            type: "number",
            message: "Width of SVG Logo",
            default: "200",
        },
        {
            name: "ySize",
            type: "number",
            message: "Height of SVG Logo",
            default: "200",
        },
        {
            name: "roundness",
            type: "number",
            message: "Input a border radius (Edge Roundness)",
            default: "10",
        }
    ]).then((response) => {
        let {xSize, ySize, roundness} = response;
        let rectSVG = new Shape.Rectangle(xSize, ySize, roundness, data);

    });
}

const generateCircle = (data) => {
    //radius
    inquirer.prompt([
        {
            name: "radius",
            type: "number",
            message: "Circle radius",
            default: "50",
        },
    ]).then((response) => {
        let radius = response.radius;
        let circleSVG = new Shape.Circle(radius, data);
        let svg = circleSVG.convertToSVG();
        console.log(svg);
        SaveSVGtoFile(svg);
    });
};