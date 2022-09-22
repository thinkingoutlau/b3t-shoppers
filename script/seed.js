"use strict";

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

const { default: axios } = require("axios");
const {
  db,
  models: { User, Product },
} = require("../server/db");

// functions to help seed db
function capitalizeName(string) {
  while (string.includes("_")) {
    let spaceSpot = string.indexOf("_");
    string =
      string.substring(0, spaceSpot) +
      " " +
      string.charAt(spaceSpot + 1).toUpperCase() +
      string.substring(spaceSpot + 2);
  }
  const finalString = string.charAt(0).toUpperCase() + string.slice(1);

  return finalString;
}

let tagsToSeed = [
  "Bed",
  "Chair",
  "Desk",
  "Dresser",
  "Sofa",
  "Table",
  "Bathroom Things",
  "Bath",
  "Lamps",
  "Clocks",
  "Arch",
  "Folk Craft Decor",
  "House Door Decor",
  "Decor",
  "Audio",
  "TV",
  "Air Conditioning",
  "Home Appliances",
  "Garden",
  "Outdoors Decor",
  "Musical Instruments",
  "Easter",
  "Seasonal Decor",
  "Seasonal decor",
  "Fish",
  "Game Console",
  "Insect",
  "Toy",
];

// seed fishies
async function fetchAllFish() {
  const { data } = await axios.get("http://acnhapi.com/v1/fish");
  return data;
}

async function mapFishObj() {
  const fishObj = await fetchAllFish();
  for (const property in fishObj) {
    const capitalizedProperty = capitalizeName(property);
    await Promise.all([
      Product.create({
        name: capitalizedProperty,
        type: "fish",
        description: fishObj[property]["museum-phrase"],
        price: fishObj[property]["price"],
        imageURL: fishObj[property]["icon_uri"],
        quantity: 100,
      }),
    ]);
  }
}

// seed sea creatures
async function fetchAllSeaCreatures() {
  const { data } = await axios.get("http://acnhapi.com/v1/sea");
  return data;
}

async function mapSeaCreaturesObj() {
  const seaCreaturesObj = await fetchAllSeaCreatures();
  for (const property in seaCreaturesObj) {
    const capitalizedProperty = capitalizeName(property);
    await Promise.all([
      Product.create({
        name: capitalizedProperty,
        type: "sea creatures",
        description: seaCreaturesObj[property]["museum-phrase"],
        price: seaCreaturesObj[property]["price"],
        imageURL: seaCreaturesObj[property]["icon_uri"],
        quantity: 100,
      }),
    ]);
  }
}

// seed bugs
async function fetchAllBugs() {
  const { data } = await axios.get("https://acnhapi.com/v1/bugs");
  return data;
}

async function mapBugsObj() {
  const bugsObj = await fetchAllBugs();
  for (const property in bugsObj) {
    const capitalizedProperty = capitalizeName(property);
    await Promise.all([
      Product.create({
        name: capitalizedProperty,
        type: "bugs",
        description: bugsObj[property]["museum-phrase"],
        price: bugsObj[property]["price"],
        imageURL: bugsObj[property]["icon_uri"],
        quantity: 100,
      }),
    ]);
  }
}

// seed fossils
async function fetchAllFossils() {
  const { data } = await axios.get("http://acnhapi.com/v1/fossils");
  return data;
}

async function mapFossilsObj() {
  const fossilsObj = await fetchAllFossils();
  for (const property in fossilsObj) {
    const capitalizedProperty = capitalizeName(property);
    await Promise.all([
      Product.create({
        name: capitalizedProperty,
        type: "fossils",
        description: fossilsObj[property]["museum-phrase"],
        price: fossilsObj[property]["price"],
        imageURL: fossilsObj[property]["image_uri"],
        quantity: 100,
      }),
    ]);
  }
}

// seed housewares
async function fetchAllHouseware() {
  const { data } = await axios.get("https://acnhapi.com/v1/houseware");
  return data;
}

async function mapHousewareObj() {
  const housewareObj = await fetchAllHouseware();
  for (const property in housewareObj) {
    const capitalizedProperty = capitalizeName(property);
    let arrVariants = housewareObj[property];
    if (tagsToSeed.includes(arrVariants[0].tag)) {
      await Promise.all([
        Product.create({
          name: capitalizedProperty,
          type: arrVariants[0].tag,
          description: "",
          price: arrVariants[0]["sell-price"],
          imageURL: arrVariants[0]["image_uri"],
          quantity: 100,
        }),
      ]);
    }
  }
}

// seed wall mounted
async function fetchAllWallMounted() {
  const { data } = await axios.get("https://acnhapi.com/v1/wallmounted");
  return data;
}

async function mapWallMountedObj() {
  const wallMountedObj = await fetchAllWallMounted();
  for (const property in wallMountedObj) {
    const capitalizedProperty = capitalizeName(property);
    let arrVariants = wallMountedObj[property];
    if (tagsToSeed.includes(arrVariants[0].tag)) {
      await Promise.all([
        Product.create({
          name: capitalizedProperty,
          type: arrVariants[0].tag,
          description: "",
          price: arrVariants[0]["sell-price"],
          imageURL: arrVariants[0]["image_uri"],
          quantity: 100,
        }),
      ]);
    }
  }
}

// seed misc
async function fetchAllMisc() {
  const { data } = await axios.get("https://acnhapi.com/v1/misc");
  return data;
}

async function mapMiscObj() {
  const miscObj = await fetchAllMisc();
  for (const property in miscObj) {
    const capitalizedProperty = capitalizeName(property);
    let arrVariants = miscObj[property];
    if (tagsToSeed.includes(arrVariants[0].tag)) {
      await Promise.all([
        Product.create({
          name: capitalizedProperty,
          type: arrVariants[0].tag,
          description: "",
          price: arrVariants[0]["sell-price"],
          imageURL: arrVariants[0]["image_uri"],
          quantity: 100,
        }),
      ]);
    }
  }
}

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating users
  const users = await Promise.all([
    User.create({ username: "cody", email: "cody@gmail.com", password: "123" }),
    User.create({
      username: "murphy",
      email: "murphy@gmail.com",
      password: "123",
    }),
  ]);

  // Creating products
  await mapFishObj();
  await mapSeaCreaturesObj();
  await mapBugsObj();
  await mapFossilsObj();
  await mapHousewareObj();
  await mapWallMountedObj();
  await mapMiscObj();

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}
