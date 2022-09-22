const { default: axios } = require("axios");

async function fetchAllHouseware() {
  const { data } = await axios.get("https://acnhapi.com/v1/houseware");
  return data;
}

async function fetchAllWallMounted() {
  const { data } = await axios.get("https://acnhapi.com/v1/wallmounted");
  return data;
}

async function fetchAllMisc() {
  const { data } = await axios.get("https://acnhapi.com/v1/misc");
  return data;
}

// seed houseware
async function fetchAllHouseware() {
  const { data } = await axios.get("https://acnhapi.com/v1/houseware");
  return data;
}

async function mapHousewareObj() {
  const housewareObj = await fetchAllHouseware();
  for (const property in housewareObj) {
    const capitalizedProperty = capitalizeName(property);
    let arrVariants = housewareObj[property];
    for (let i = 0; i < arrVariants.length; i++) {
      console.log(arrVariants[i].name["name-USen"]);
    }
  }
}
