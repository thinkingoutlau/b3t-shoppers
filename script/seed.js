"use strict";

// tags to seed:

// housewares:
// bed + chair + desk + dresser + sofa + table + bathroom things + bathtub = furniture
// lamps + clocks + arch + folk craft decor + house door decor + decor = decor
// home appliances + audio + tv + air conditioning = electronics

// outdoor stuff:
// garden + outdoors decor = outdoor

// other:
// musical instruments
// easter + seasonal decor + seasonal Decor = seasonal
// fish + game console + insect + toy = toys

const axios = require("axios");
const {
  db,
  models: { User, Product },
} = require("../server/db");

let tagsToSeed = [
  "Bed",
  "Chair",
  "Desk",
  "Dresser",
  "Sofa",
  "Table",
  "Bathroom Things",
  "Bathtub",
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

function lowercaseName(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function emailGenerator(name) {
  while (name.includes(" ")) {
    let spaceSpot = name.indexOf(" ");
    name = name.substring(0, spaceSpot) + name.substring(spaceSpot + 1);
  }
  while (name.includes(".")) {
    let periodSpot = name.indexOf(".");
    name = name.substring(0, periodSpot) + name.substring(periodSpot + 1);
  }
  return `${name}@gmail.com`;
}

function descriptionGenerator(tag, productName, color1, color2) {
  color1 = lowercaseName(color1);
  color2 = lowercaseName(color2);

  if (color1 === "colorful") {
    color1 = "rainbow";
  }

  if (color2 === "colorful") {
    color2 = "rainbow";
  }

  switch (tag) {
    case "Bed":
      return `This ${productName} is guaranteed to provide you a good night's rest! It comes in ${color1} and ${color2} and is stylish for customers of all ages.`;
    case "Chair":
      return `This ${productName} is perfect for reading, knitting, or just taking a break from a long time on your feet. It comes in ${color1} and ${color2} and can be used to furnish any type of space!`;
    case "Desk":
      return `This ${productName} is perfect for an office or home workspace! It's practicality is great for all ages and the stylish coloring of ${color1} and ${color2} will fit right into any space.`;
    case "Dresser":
      return `This ${productName} is just the storage space you need for your bedroom! It's practicality is great for all ages and the stylish coloring of ${color1} and ${color2} will fit right into any space.`;
    case "Sofa":
      return `This ${productName} is a perfect addition to any space. It's comfortable cushions in the colors of ${color1} and ${color2} will fit right in with your other decor and provide a comfortable space for you to relax after a long day.`;
    case "Table":
      return `This ${productName} is a practical addition to any space. It's stylish colors of ${color1} and ${color2} will look great in your home.`;
    case "Bathroom Things":
      return `This ${productName} is a great addition to your bathroom. It's fun and stylish colors of ${color1} and ${color2} will complement any existing space.`;
    case "Bathtub":
      return `This ${productName} is a necessity for any bathroom. It will help you stay squeaky clean, while also adding ${color1} and ${color2} to your space.`;
    case "Lamps":
      return `This ${productName} will illuminate any space while adding color and character.`;
    case "Clocks":
      return `Never be late again with this ${productName}! It's stylish design of ${color1} and ${color2} will brighten up your day and ensure you are promptly on time for all events in your life.`;
    case "Arch":
      return `This beautiful ${productName} of ${color1} and ${color2} is a wonderful decoration for any party.`;
    case "Folk Craft Decor":
      return `This ${productName} is guaranteed to brighten up your space and add some much needed character.`;
    case "House Door Decor":
      return `This ${productName} is a wonderful hanging addition to any wall or door space. It's bright colors of ${color1} and ${color2} will put a smile on your face!`;
    case "Decor":
      return `This beautiful ${productName} is a wonderful addition to any space. It will brighten up all spaces with the colors of ${color1} and ${color2}.`;
    case "Audio":
      return `This ${productName} will add joy to your life through the gift of music! Brighten up your day with this brightly colored ${productName} in the colors of ${color1} and ${color2}`;
    case "TV":
      return `This ${productName} is a worthy electronic addition to your humble abode. Compatible with chromecast and roku TV, enjoy your favorite TV shows right in the comfort of your own home!`;
    case "Air Conditioning":
      return `Keep yourself cool with this summer with this ${productName}! It's stylish colors of ${color1} and ${color2} will make you the COOLEST house on the block.`;
    case "Home Appliances":
      return `This ${productName} is a functional addition to any home! It's not only stylish in the colors of ${color1} and ${color2}`;
    case "Garden":
      return `This ${productName} is a stylish functional addition to your outdoor space. It's vibrant colors of ${color1} and ${color2} is guaranteed to help you keep your lawn nice and green.`;
    case "Outdoors Decor":
      return `This ${productName} is a stylish functional addition to your outdoor space. It's vibrant colors of ${color1} and ${color2} is guaranteed to make all your neighbors jealous.`;
    case "Musical Instruments":
      return `This beautifully made ${productName} is pitch perfect for those musically inclined. It's classic colors of ${color1} and ${color2} are great for use at home and on the professional stage.`;
    case "Easter":
      return `This ${productName} is a great addition to your Easter party. It's vibrant ${color1} color are guaranteed to bring festivities during the Easter season.`;
    case "Seasonal Decor":
      return `This ${productName} is a great addition to your seasonal decor. It's guaranteed to bring joy to all your festivities.`;
    case "Seasonal decor":
      return `This ${productName} is a great addition to your seasonal decor. It's guaranteed to bring joy to all your festivities.`;
    case "Fish":
      return `This ${productName} is a collectible model for all fish fanatics. It's vibrant colors of ${color1} and ${color2} will bring life to any and all displays.`;
    case "Game Console":
      return `This ${productName} is the new hot game console on the market! It's sleek colors of ${color1} and ${color2} are bound to impress the younger generation.`;
    case "Insect":
      return `This ${productName} is a collectible model for all insect fanatics. It's vibrant colors of ${color1} and ${color2} will bring life to any and all displays.`;
    case "Toy":
      return `This ${productName} is a high quality tool to keep your children busy for hours on end.`;
    default:
      return `Sorry there is no description here!`;
  }
}

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
        type: "foodFish",
        description: fishObj[property]["museum-phrase"],
        price: fishObj[property]["price"] * 100,
        imageURL: fishObj[property]["icon_uri"],
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
        price: fossilsObj[property]["price"] * 100,
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
    const arrVariants = housewareObj[property];
    const description = descriptionGenerator(
      arrVariants[0].tag,
      arrVariants[0]["name"]["name-USen"],
      arrVariants[0]["color-1"],
      arrVariants[0]["color-2"]
    );
    if (tagsToSeed.includes(arrVariants[0].tag)) {
      await Promise.all([
        Product.create({
          name: capitalizedProperty,
          type: arrVariants[0].tag,
          description: description,
          price: arrVariants[0]["sell-price"] * 100,
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
    const arrVariants = wallMountedObj[property];
    const description = descriptionGenerator(
      arrVariants[0].tag,
      arrVariants[0]["name"]["name-USen"],
      arrVariants[0]["color-1"],
      arrVariants[0]["color-2"]
    );
    if (tagsToSeed.includes(arrVariants[0].tag)) {
      await Promise.all([
        Product.create({
          name: capitalizedProperty,
          type: arrVariants[0].tag,
          description: description,
          price: arrVariants[0]["sell-price"] * 100,
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
    const arrVariants = miscObj[property];
    const description = descriptionGenerator(
      arrVariants[0].tag,
      arrVariants[0]["name"]["name-USen"],
      arrVariants[0]["color-1"],
      arrVariants[0]["color-2"]
    );
    if (tagsToSeed.includes(arrVariants[0].tag)) {
      await Promise.all([
        Product.create({
          name: capitalizedProperty,
          type: arrVariants[0].tag,
          description: description,
          price: arrVariants[0]["sell-price"] * 100,
          imageURL: arrVariants[0]["image_uri"],
          quantity: 100,
        }),
      ]);
    }
  }
}

// seed users
async function fetchUsers() {
  const { data } = await axios.get("http://acnhapi.com/v1/villagers/");
  return data;
}

async function mapUsersObj() {
  const usersObj = await fetchUsers();
  console.log(usersObj);
  for (const property in usersObj) {
    const email = emailGenerator(usersObj[property]["name"]["name-USen"]);
    console.log(email);
    await Promise.all([
      User.create({
        fullName: usersObj[property]["name"]["name-USen"],
        username: usersObj[property]["name"]["name-USen"],
        email: email,
        password: "123",
      }),
    ]);
  }
}

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating admin users
  await Promise.all([
    User.create({
      fullName: "Tom Nook",
      username: "TomNook",
      email: "TomNook@gmail.com",
      password: "123",
      isAdmin: true,
    }),
    User.create({
      fullName: "Timmy",
      username: "Timmy",
      email: "Timmy@gmail.com",
      password: "123",
      isAdmin: true,
    }),
    User.create({
      fullName: "Tommy",
      username: "Tommy",
      email: "Tommy@gmail.com",
      password: "123",
      isAdmin: true,
    }),
  ]);

  // Creating users
  await mapUsersObj();

  // Creating products
  await mapFishObj();
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
