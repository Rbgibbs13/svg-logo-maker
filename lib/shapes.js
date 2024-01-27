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
    <text><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.25}" y="${sizeX*0.625}">${title}</tspan></text>
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
`<svg height="${sizeY}" width="${sizeX}" xmlns="${svgNS}" version="1.1">
    <ellipse cx="${sizeX*0.5}" cy="${sizeY*0.5}" rx="${sizeX*0.5-strokeWidth*2}" ry="${sizeY*0.5-strokeWidth*2}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.25}" y="${sizeY*0.625}">${title}</tspan></text>
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
`<svg height="${sizeX}" width="${sizeX}" xmlns="${svgNS}" version="1.1">
    <rect x="${strokeWidth}" y="${strokeWidth}" rx="${roundness}" ry="${roundness}" width="${sizeX-strokeWidth*2}" height="${sizeX-strokeWidth*2}" fill="${color}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>
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
    <polygon points="${sizeX/2},${strokeWidth} 40,198 190,78 10,78 160,198"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.25}" y="${sizeY*0.625}">${title}</tspan></text>
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
    constructor(sizeX, xOffset, yOffset, roundness, data) {
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
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
// (title, type, color, xOffset, yOffset, sizeX, sizeY, roundness, strokeWidth, borderColor)
class Ellipse extends Shape {
    //yRoundess : xRoundness
    constructor(sizeX, sizeY, data) {
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "ellipse", this.color, this.xOffset, this.yOffset, this.sizeX, this.sizeY, this.roundness, this.strokeWidth, this.borderColor);
    }
};

class Star extends Shape {
    //points
    constructor(sizeX, sizeY, data) {
        console.log("Star: ");
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "star", this.color, this.xOffset, this.yOffset, this.sizeX, this.sizeY, 0, this.strokeWidth, this.borderColor);
    }
};

module.exports = {Shape, Circle, Rectangle, Triangle, Ellipse, Square};