const axios = require("axios");

// has icons
async function fetchAllFish() {
  const { data } = await axios.get("http://acnhapi.com/v1/fish");
  return data;
}

async function fetchAllSeaCreatures() {
  const { data } = await axios.get("http://acnhapi.com/v1/sea");
  return data;
}

async function fetchAllBugs() {
  const { data } = await axios.get("https://acnhapi.com/v1/bugs");
  return data;
}

// has pictures
async function fetchAllFossils() {
  const { data } = await axios.get("http://acnhapi.com/v1/fossils");
  return data;
}

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

module.exports;
