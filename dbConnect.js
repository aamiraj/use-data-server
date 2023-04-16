const path = require("path");
const fs = require("fs");

function dataCollection() {
  const jsonFile = path.join(process.cwd(), "json", "userData.json");
  const fileContents = fs.readFileSync(jsonFile, "utf8");
  const data = JSON.parse(fileContents);
  return data;
}

function addToData(data) {
  const dataJson = JSON.stringify(data);
  const jsonFile = path.join(process.cwd(), "json", "userData.json");
  fs.writeFile(jsonFile, dataJson);
}

module.exports = { dataCollection, addToData };
