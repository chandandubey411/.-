const fs = require('fs');
let content = fs.readFileSync('src/data/propertiesData.js', 'utf8');

const locations = [
  "AGCR Enclave, Delhi",
  "Priya Enclave, Delhi",
  "Hargobind Enclave, Delhi",
  "Dayanand Vihar, Delhi",
  "Arya Nagar, Delhi",
  "Savita Vihar, Delhi",
  "Jagriti Enclave, Delhi",
  "Anand Vihar, Delhi",
  "Shreshtha Vihar, Delhi",
  "Yojna Vihar, Delhi",
  "Vivek Vihar, Delhi",
  "Surajmal Vihar, Delhi",
  "Ram Vihar, Delhi",
  "Shanti Vihar, Delhi",
  "Rishabh Vihar, Delhi",
  "Surya Niketan, Delhi",
  "Ashoka Niketan, Delhi",
  "Manak Vihar, Delhi",
  "Vigyan Lok, Delhi",
  "Vigyan Vihar, Delhi",
  "Pushpanjali Enclave, Delhi",
  "Saini Enclave, Delhi",
  "Bahubali Enclave, Delhi"
];

let locIndex = 0;
content = content.replace(/location:\s*'[^']+'/g, () => {
    const loc = locations[locIndex % locations.length];
    locIndex++;
    return `location: '${loc}'`;
});

fs.writeFileSync('src/data/propertiesData.js', content);
console.log("Replaced locations");
