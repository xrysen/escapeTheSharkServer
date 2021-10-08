const express = require("express");
const app = express();
const ampCors = require("@ampproject/toolbox-cors");
const axios = require("axios");
const multer = require("multer");
const multipart = multer();
const PORT = process.env.PORT || 8000;

app.use(
  ampCors({
    verifyOrigin: false,
    email: true,
    allowCredentials: true,
  })
);

app.use(express.json());

let letters = {
  letters: [
    { letter: "A" },
    { letter: "B" },
    { letter: "C" },
    { letter: "D" },
    { letter: "E" },
    { letter: "F" },
    { letter: "G" },
    { letter: "H" },
    { letter: "I" },
    { letter: "J" },
    { letter: "K" },
    { letter: "L" },
    { letter: "M" },
    { letter: "N" },
    { letter: "O" },
    { letter: "P" },
    { letter: "Q" },
    { letter: "R" },
    { letter: "S" },
    { letter: "T" },
    { letter: "U" },
    { letter: "V" },
    { letter: "W" },
    { letter: "X" },
    { letter: "Y" },
    { letter: "Z" },
  ],
};

const words = [
  "pancakes",
  "guitar",
  "music",
  "honeycomb",
  "wedding",
  "dyspatch",
  "penicillin",
  "spooky",
  "halloween"
];

let word = words[Math.floor(Math.random() * 9)];
let characters = { characters: [] };

for (let i = 0; i < word.length; i++) {
  characters.characters.push({ character: "" });
}

let currentState = "";

let currentImage = 0;
const image = [
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiZmN1UEFXTlFKNlR6WldkaGU3RVIifQ==,signature:24a68076951c3a30f420d7305b879a9a67e61f4faf37f579ef702acfbbf19ba0/fcuPAWNQJ6TzZWdhe7ER",
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoibzRxNDIxNVFZeUVmcm5QcW54dmUifQ==,signature:a095c251d1fb9258ec73234e5fba5c7ebfb89d52632180bdb458ed90cd24cf78/o4q4215QYyEfrnPqnxve",
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiVEpjekpha1NvbVZYa2tXMUY2elMifQ==,signature:e64db9e31841c04e80b1c89fbb8ea2d6cd4b3efec4c31035a9a68edb063105f3/TJczJakSomVXkkW1F6zS",
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiVlg2ZkNEellSU2l2bG5WSFUwcW0ifQ==,signature:08042c187aea04a11ac38ce0b16520750910ef00ce4f75b5fbceef7112b31856/VX6fCDzYRSivlnVHU0qm",
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiam03eThERE1ReDI1TXhQMkRXYjAifQ==,signature:64dc343e1590163db32d06cb651669bdbb9bb1e70d27c1700a5b0f23f74ae7f2/jm7y8DDMQx25MxP2DWb0",
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiOHFIZzdJdzBRNTZrMlNKUEhpd2QifQ==,signature:1243707b9e7f9e5208644a9cf28392cc5cc956f710edf594c2488f184b154401/8qHg7Iw0Q56k2SJPHiwd",
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiYVFOWkNsU1dUMTJqSkc4dzVmY0oifQ==,signature:8a72e825f84cbe2bd3e148bde97cbd77f2aabbc86f96dba627f82ae967a62595/aQNZClSWT12jJG8w5fcJ",
  "https://cdn.assets.dyspatch.io/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MjE0NzQ4MzY0NywiaGFuZGxlIjoiT3JVN1pXNVRFZWRPYkFDNmZUNWcifQ==,signature:76e2e51854b404764257883ea4a1c924dda0be587424900ff6cfdcabe3703e67/OrU7ZW5TEedObAC6fT5g",
];

let numGuesses = 0;

console.log(word);

app.post("/reset", (req, res) => {
  letters = {
    letters: [
      { letter: "A" },
      { letter: "B" },
      { letter: "C" },
      { letter: "D" },
      { letter: "E" },
      { letter: "F" },
      { letter: "G" },
      { letter: "H" },
      { letter: "I" },
      { letter: "J" },
      { letter: "K" },
      { letter: "L" },
      { letter: "M" },
      { letter: "N" },
      { letter: "O" },
      { letter: "P" },
      { letter: "Q" },
      { letter: "R" },
      { letter: "S" },
      { letter: "T" },
      { letter: "U" },
      { letter: "V" },
      { letter: "W" },
      { letter: "X" },
      { letter: "Y" },
      { letter: "Z" },
    ],
  };

  word = words[Math.floor(Math.random() * 7)];
  characters = { characters: [] };

  for (let i = 0; i < word.length; i++) {
    characters.characters.push({ character: "" });
  }

  currentState = "";
  currentImage = 0;
  console.log(word);
  res.send("Success");
});

app.get("/", (req, res) => {});

app.get("/image", (req, res) => {
  setTimeout(() => {
    res.json({
      items: [{ image: image[currentImage] }],
    });
  }, 300);
});

app.get("/letters", (req, res) => {
  setTimeout(() => {
    res.json({
      items: [letters, { word: word }, characters, { state: currentState }],
    });
  }, 300);
});

const getAllIndexes = (arr, val) => {
  let indexes = [];
  let i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
};

app.post("/updateLetters", multipart.fields([]), (req, res) => {
  letters.letters.splice(
    letters.letters.findIndex((x) => x.letter === req.body.guess),
    1
  );
  if (word.toUpperCase().includes(req.body.guess)) {
    let indexes = getAllIndexes(word.toUpperCase(), req.body.guess);
    for (let i = 0; i < indexes.length; i++) {
      characters.characters[indexes[i]] = { character: req.body.guess };
    }
  } else {
    currentImage++;
    numGuesses++;
  }

  for (const character of characters.characters) {
    if (!character.character) {
      res.send("Not yet");
      return;
    }
  }
  currentState = "Nice job!";
  currentImage = 7;
  res.send("Winner!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
