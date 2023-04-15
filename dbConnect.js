const path = require("path");
const fs = require("fs/promises");

async function dataCollection() {
  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(
    jsonDirectory + "/userData.json",
    "utf8"
  );
  //const fileContents = fs.readFileSync("./userData.json", "utf8");
  const data = JSON.parse(fileContents);
  return data;
  //res.status(200).json(fileContents);
}

async function addToData(data) {
  const dataJson = JSON.stringify(data);
  const jsonDirectory = path.join(process.cwd(), "json");
  await fs.writeFile(jsonDirectory + "/userData.json", dataJson);
}

module.exports = { dataCollection, addToData };
