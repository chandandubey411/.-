const fs = require('fs');
let content = fs.readFileSync('c:/Users/asus/OneDrive/Desktop/Chand/property_mines/propertymines/src/data/propertiesData.js', 'utf8');

const sizes = [125, 150, 180, 200, 250, 275, 300, 350, 375];

let sizeIndex = 0;
content = content.replace(/sqft:\s*\d+/g, () => {
    const size = sizes[sizeIndex % sizes.length];
    sizeIndex++;
    return `sqft: ${size}`;
});

fs.writeFileSync('c:/Users/asus/OneDrive/Desktop/Chand/property_mines/propertymines/src/data/propertiesData.js', content);
console.log("Replaced sizes in data");
