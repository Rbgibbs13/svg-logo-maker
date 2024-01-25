const { size } = require("lodash");
const svgNS = "http://www.w3.org/2000/svg";

const generateSVG = (title, type, color, xOffset, yOffset, sizeX, sizeY, roundness, strokeWidth, borderColor) => {
    
    let shape;
    switch(type) {
        case "rectangle":
            shape = 
`<svg width="${sizeX}" height="${sizeY}" xmlns="${svgNS}" version="1.1">
    <rect x="${xOffset}" y="${yOffset}" rx="${roundness}" ry="${roundness}" width="${sizeX}" height="${sizeY}" fill="${color}" stroke="${borderColor} stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${xOffset}" y="${yOffset}">${title}</tspan></text>
    <style>
        text {
                font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
            }
    </style>
</svg>`;
            break;

        case "circle":
            shape = 
`<svg width="${sizeX}" height="${sizeX}" xmlns="${svgNS}" version="1.1">
    <circle cx="${sizeX/2}" cy="${sizeX/2}" r="${sizeX*0.4}" fill="${color}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.25}" y="${sizeX*0.6}">${title}</tspan></text>
    <style>
        text{
                font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
            }
    </style>
</svg>`;
            break;

        case "ellipse":
            shape = `<ellipse cx="${xOffset}" cy="${yOffset}" rx="${sizeX}" ry="${sizeY}"/>`;
            break;

        case "triangle":
            shape = ``;
            break;

        case "square":
            shape = `<rect x="${xOffset}" y="${yOffset}" rx="${roundness}" ry="${roundness}" width="${sizeX}" height="${sizeX}" fill="${color}" stroke="${borderColor} stroke-width="${strokeWidth}"/>`;
            break;
            
        case "star":
            shape = `<polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180" stroke="${borderColor}" fill="${color}" stroke-width="${strokeWidth}"/>`
    }

    return shape;
}

class Shape {
    constructor(title, color, borderColor, strokeWidth, xOffset, yOffset) {
        this.title = title;
        this.color = color;
        this.borderColor = borderColor;
        this.strokeWidth = strokeWidth;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }
};

// (title, type, color, xOffset, yOffset, sizeX, sizeY, roundness, strokeWidth, borderColor)
class Circle extends Shape {
    //sizeX : color : borderColor : title : 
    constructor(radius, data) {
        console.log("Circle: " + data.borderColor);
        super(data.title, data.color, data.borderColor, data.strokeWidth, data.xOffset, data.yOffset);
        this.radius = radius;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "circle", this.color, this.xOffset, this.yOffset, this.radius, 0, 0, this.strokeWidth, this.borderColor);
    }
};

class Rectangle extends Shape {
    //sizeX : sizeY : color : borderColor : roundness : xOffset : yOffset : title
    constructor(sizeX, sizeY, data) {
        super(data.title, data.color, data.borderColor, data.strokeWidth, data.xOffset, data.yOffset);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.roundness = data.roundness;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "rectangle", this.color, this.xOffset, this.yOffset, this.sizeX, this.sizeY, 0, this.strokeWidth, this.borderColor);
    }
};

class Triangle extends Shape {
    constructor() {

    }
};

class Ellipse extends Shape {
    //yRadius xRadius
    constructor() {

    }
};

class Square extends Shape {
    //size : => width and height
    constructor() {

    }
};

const shape1 = new Shape(25,25);
module.exports = {Shape, Circle};