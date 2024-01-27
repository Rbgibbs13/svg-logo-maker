const fs = require("fs");

const SaveSVGtoFile = (saveFileName, svg) => {
    fs.writeFile(`./examples/${saveFileName}.svg`, `${svg}`, (error) => 
        error ? console.error(error) : console.log("SVG Saved")
    );
};

module.exports = SaveSVGtoFile;