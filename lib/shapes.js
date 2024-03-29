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
            let fontSize = sizeX*0.3;
            let x = fontSize*0.458;
            let y = fontSize*2;
            shape = 
`<svg width="${sizeX}" height="${sizeX}" xmlns="${svgNS}" version="1.1">
    <circle cx="${sizeX/2}" cy="${sizeX/2}" r="${sizeX*0.4}" fill="${color}" stroke="${borderColor}" stroke-width="${strokeWidth}"/>
    <text><tspan font-weight="bold" fill="${borderColor}" x="${x}" y="${y}">${title}</tspan></text>
    <style>
        text{
                font: ${fontSize}px Verdana, Helvetica, Arial, sans-serif;
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
            font: ${(sizeX/5)*2}px Verdana, Helvetica, Arial, sans-serif;
        }
    </style>
</svg>`;
            break;
// -----------------STAR-----------------
        case "star":
            shape = 
`<svg height="${sizeX}" width="${sizeY}" xmlns="${svgNS}" version="1.1">
    <defs>
        <filter id="filterBack" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="${setMinMax(sizeX/50)}" dy="${setMinMax(sizeY/50)}" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <filter id="filterText" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="${setMinMax(sizeX/50)}" dy="${setMinMax(sizeY/50)}" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
    </defs>
    <polygon points="${sizeX/2},${strokeWidth} ${sizeX*0.2},${sizeY-strokeWidth} ${sizeX-strokeWidth},${sizeY*0.375} ${strokeWidth},${sizeY*0.375} ${sizeX*0.8},${sizeY-strokeWidth}" filter="url(#filterBack)"/>
    <text filter="url(#filterText)"><tspan font-weight="bold" fill="${borderColor}" x="${sizeX*0.35}" y="${sizeY*0.6}">${title}</tspan></text>
    <style>
        text {
            font: ${sizeX/8}px Verdana, Helvetica, Arial, sans-serif;
        }
        polygon {
            fill: ${color};
            stroke: ${borderColor};
            stroke-width: ${strokeWidth};
            fill-rule: ${roundness};
        }
    </style>
</svg>`            
            break;
        
        default:
            shape = ``;
    }

    return shape;
}

//Clamp a value between 0 and 20
const setMinMax = (val) => {
    const min = 0;
    const max = 20;
    return Math.min(Math.max(val, min), max);
};

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
        console.log(data.title);
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.radius = radius;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "circle", this.color, this.xOffset, this.yOffset, this.radius, 0, 0, this.strokeWidth, this.borderColor);
    }
};

class Ellipse extends Shape {
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
    constructor(sizeX, sizeY, fillRule, data) {
        super(data.title, data.color, data.borderColor, data.strokeWidth);
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.fillRule = fillRule;
    }

    convertToSVG = () => {
        return generateSVG(this.title, "star", this.color, this.xOffset, this.yOffset, this.sizeX, this.sizeY, this.fillRule, this.strokeWidth, this.borderColor);
    }
};

module.exports = {Shape, Circle, Rectangle, Triangle, Ellipse, Square, Star};