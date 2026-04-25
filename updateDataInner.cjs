const fs = require('fs');
let content = fs.readFileSync('c:/Users/asus/OneDrive/Desktop/Chand/property_mines/propertymines/src/data/propertiesData.js', 'utf8');

const locations = [
  "AGCR Enclave",
  "Priya Enclave",
  "Hargobind Enclave",
  "Dayanand Vihar",
  "Arya Nagar",
  "Savita Vihar",
  "Jagriti Enclave",
  "Anand Vihar",
  "Shreshtha Vihar",
  "Yojna Vihar",
  "Vivek Vihar",
  "Surajmal Vihar",
  "Ram Vihar",
  "Shanti Vihar",
  "Rishabh Vihar",
  "Surya Niketan",
  "Ashoka Niketan",
  "Manak Vihar",
  "Vigyan Lok",
  "Vigyan Vihar",
  "Pushpanjali Enclave",
  "Saini Enclave",
  "Bahubali Enclave"
];

let locIndex = 0;
content = content.replace(/location:\s*'[^']+'/g, () => {
    const loc = locations[locIndex % locations.length];
    locIndex++;
    return `location: '${loc}'`;
});

fs.writeFileSync('c:/Users/asus/OneDrive/Desktop/Chand/property_mines/propertymines/src/data/propertiesData.js', content);
console.log("Replaced locations in inner folder");
