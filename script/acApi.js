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
//chests

// tags to seed:

// housewares:
// bed + chair + desk + dresser + sofa + table + bathroom things + bath = furniture
// lamps + clocks + arch + folk craft decor + house door decor + decor = decor
// home appliances + audio + tv + air conditioning = electronics

// outdoor stuff:
// garden + outdoors decor = outdoor

// other:
// musical instruments
// easter + seasonal decor + seasonal Decor = seasonal
// fish + game console + insect + toy = toys
