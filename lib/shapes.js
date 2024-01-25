// const { size } = require("lodash");
const svgNS = "http://www.w3.org/2000/svg";

const generateSVG = (title, type, color, xOffset, yOffset, sizeX, sizeY, roundness, strokeWidth, borderColor) => {
    
    let shape;
    switch(type) {
// -----------------RECTANGLE-----------------
        case "rectangle":
            shape = 
`<svg width="${sizeX}" height="${sizeY}" xmlns="${svgNS}" version="1.1">
    <rect x="${strokeWidth}" y="${strokeWidth}" rx="${roundness}" ry="${roundness}" width="${sizeX-strokeWidth*2}" height="${sizeY-strokeWidth*2}" fill="${color}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${xOffset}" y="${yOffset}">${title}</tspan></text>
    <style>
        text {
                font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
            }
    </style>
</svg>`;
            break;
// -----------------CIRCLE-----------------
        case "circle":
            shape = 
`<svg width="${sizeX}" height="${sizeX}" xmlns="${svgNS}" version="1.1">
    <circle cx="${sizeX/2}" cy="${sizeX/2}" r="${sizeX*0.4}" fill="${color}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.25}" y="${sizeX*0.55}">${title}</tspan></text>
    <style>
        text{
                font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
            }
    </style>
</svg>`;
            break;
// -----------------ELLIPSE-----------------
        case "ellipse":
            shape = 
`<svg height="${sizeX}" width="${sizeY}" xmlns="${svgNS}" version="1.1">
    <ellipse cx="${roundness}" cy="${roundness}" rx="${sizeX-strokeWidth*2}" ry="${sizeY-strokeWidth*2}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.4}" y="${sizeY*0.4}">${title}</tspan></text>
    <style>
        text {
            font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
        }
    </style>
</svg>`;
            break;
// -----------------TRIANGLE-----------------
        case "triangle":
            shape = 
`<svg height="${sizeX}" width="${sizeY}" xmlns="${svgNS}" version="1.1">
    <polygon points="${sizeX*0.5},${strokeWidth} ${sizeX-strokeWidth},${sizeY-strokeWidth} ${strokeWidth},${sizeY-strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.25}" y="${sizeY*0.7}">${title}</tspan></text>
    <style>
        text {
            font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
        }
        polygon {
            fill:${color};
            stroke:${borderColor};
            stroke-width:${strokeWidth};
        }
    </style>
</svg>`;
            break;
// -----------------SQUARE-----------------
        case "square":
            shape = 
`<svg height="${sizeX}" width="${sizeY}" xmlns="${svgNS}" version="1.1">
    <rect x="${strokeWidth}" y="${strokeWidth}" rx="${roundness}" ry="${roundness}" width="${sizeX-strokeWidth}" height="${sizeX-strokeWidth}" fill="${color}" stroke="${borderColor} stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${xOffset}" y="${yOffset}">${title}</tspan></text>
    <style>
        text {
            font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
        }
    </style>
</svg>`;
            break;
// -----------------STAR-----------------
        case "star":
            shape = 
`<svg height="${sizeX}" width="${sizeY}" xmlns="${svgNS}" version="1.1">
    <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${xOffset}" y="${yOffset}">${title}</tspan></text>
    <style>
        text {
            font: ${sizeX/5}px Verdana, Helvetica, Arial, sans-serif;
        }
        polygon {
            fill: ${color};
            stroke: ${borderColor};
            stroke-width: ${strokeWidth};
            fill-rule: ${fillRule};
        }
    </style>
</svg>`            
            break;
        
        default:
            shape = ``;
    }

    return shape;
}

class Shape {
    constructor(title, color, borderColor, strokeWidth) {
        this.title = title;
        this.color = color;
        this.borderColor = borderColor;
        this.strokeWidth = strokeWidth;
    }
};

// (title, type, color, xOffset, yOffset, sizeX, sizeY, roundness, strokeWidth, borderColor)
class Square extends Shape {
    //size : => width and height
    constructor(sizeX, sizeY, xOffset, yOffset, roundness, data) {
        console.log("Rect: " + roundness);
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.xOffset = xOffset;
        this.yOffset = yOffset
        this.roundness = roundness;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "square", this.color, this.xOffset, this.yOffset, this.sizeX, this.sizeY, this.roundness, this.strokeWidth, this.borderColor);
    }
};

class Rectangle extends Shape {
    //sizeX : sizeY : color : borderColor : roundness : xOffset : yOffset : title
    constructor(sizeX, sizeY, xOffset, yOffset, roundness, data) {
        console.log("Rect: " + roundness);
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.xOffset = xOffset;
        this.yOffset = yOffset
        this.roundness = roundness;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "rectangle", this.color, this.xOffset, this.yOffset, this.sizeX, this.sizeY, this.roundness, this.strokeWidth, this.borderColor);
    }
};

class Triangle extends Shape {
    //sizeX : sizeY : color : borderColor : title : strokeWidth
    constructor(sizeX, sizeY, data) {
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "triangle", this.color, this.xOffset, this.yOffset, this.sizeX, this.sizeY, this.roundness, this.strokeWidth, this.borderColor);
    }
};

class Circle extends Shape {
    //sizeX : color : borderColor : title : 
    constructor(radius, data) {
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.radius = radius;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "circle", this.color, this.xOffset, this.yOffset, this.radius, 0, 0, this.strokeWidth, this.borderColor);
    }
};

class Ellipse extends Shape {
    //yRoundess : xRoundness
    constructor(sizeX, sizeY, roundness, data) {
        console.log("Ellipse: " + roundness);
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.roundness = roundness;
    }
};

class Star extends Shape {
    //points
    constructor() {

    }
};

module.exports = {Shape, Circle, Rectangle, Triangle, Ellipse, Square};