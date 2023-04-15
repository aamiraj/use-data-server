const fs = require("fs");

function dataCollection() {
  const jsonString = fs.readFileSync("data/userData.json", "utf8");
  const data = JSON.parse(jsonString);
  return data;
}

function addToData(data){
  const dataJson = JSON.stringify(data)
  fs.writeFileSync("data/userData.json", dataJson);
}

module.exports = {dataCollection, addToData};
