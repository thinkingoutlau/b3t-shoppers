// has pictures

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
