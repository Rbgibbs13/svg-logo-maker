//const D3Node = require("d3-node");
//const xmlserializer = require("xmlserializer");
const svgNS = "http://www.w3.org/2000/svg";
let sampleColor = "rgb(0,0,250)";


const generateSVG = (type, color, xOffset, yOffset, sizeX, sizeY, roundness, strokeWidth, borderColor) => {
    
    let shape;
    switch(type) {
        case "rectangle":
            shape = `<rect x="${xOffset}" y="${yOffset}" rx="${roundness}" ry="${roundness}" width="${sizeX}" height="${sizeY}" fill="${color}" stroke="${borderColor} stroke-width="${strokeWidth}"/>`;
            break;

        case "circle":
            shape = `<circle cx="${xOffset}" cy="${yOffset}" r="${sizeX}" fill="${color}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>`;
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
    constructor(color, borderColor, strokeWidth, xOffset, yOffset) {
        this.color = color;
        this.borderColor = borderColor;
        this.strokeWidth = strokeWidth;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }
};

class Circle extends Shape {
    constructor(radius, data) {
        console.log("Circle: " + data);
        super(data.color, data.borderColor, data.strokeWidth, data.xOffset, data.yOffset);
        this.radius = radius;
    }

    convertToSVG = () => {
        return generateSVG("circle", this.color, this.xOffset, this.yOffset, this.radius, 0, 0, this.strokeWidth, this.borderColor);
    }
};

class Rectangle extends Shape {
    //sizeX sizeY : width height
    constructor(sizeX, sizeY, data) {
        super(data.color, data.borderColor, data.strokeWidth, data.xOffset, data.yOffset);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
};

class Ellipse extends Shape {
    //yRadius xRadius
    constructor() {

    }
};

class Triangle extends Shape {
    constructor() {

    }
};

class Square extends Shape {
    //size : => width and height
    constructor() {

    }
};

/* <svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
  <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
  <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
</svg> */

const shape1 = new Shape(25,25);
module.exports = {Shape, Circle};