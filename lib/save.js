const fs = require("fs");

const SaveSVGtoFile = (saveFileName, svg) => {
    fs.writeFile(`./examples/${saveFileName}.svg`, `${svg}`, (error) => 
        error ? console.error(error) : console.log(`GENERATED and SAVED ${saveFileName}.svg `)
    );
};

module.exports = SaveSVGtoFile;