// const {business,business1,business2,business3} =require("./akash");
// const {tiffin,lacasa} =require("./krishna");
// const sa = require("./sana");

// import { business ,business1,business2,business3,demo} from "./akash.js";
// console.log(business);
// console.log(business1);
// console.log(business2);
// console.log(business3);
// demo();

// fetch("https://instafood.onrender.com/api/restaurants?lat=19.0918606&lng=72.8825928")
//   .then((res) => {
//     console.log("Step 1 → Raw Response:", res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log("Step 2 → Full Object:", data);

//     // Show object structure clearly
//     console.log("Step 3 → Full JSON Format:");
//     console.log(JSON.stringify(data, null, 2));

//     // Show main keys
//     console.log("Step 4 → Object Keys:", Object.keys(data));

//     // Check nested values safely
//     console.log("Step 5 → data.data:", data.data);
//     console.log("Step 6 → data.restaurants:", data.restaurants);
//     console.log("Step 7 → data.cards:", data.cards);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });


const BASE_IMG_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

fetch("https://instafood.onrender.com/api/restaurants?lat=19.0918606&lng=72.8825928")
  .then((res) => res.json())
  .then((data) => {
    // Change path if your structure is different
    const restaurants =
      data?.data?.restaurants ||
      data?.restaurants ||
      data?.data?.cards ||
      [];

    const imageUrls = [];

    restaurants.forEach((item) => {
      const imageId = item?.info?.cloudinaryImageId;

      if (imageId) {
        const fullImageURL = BASE_IMG_URL + imageId;
        imageUrls.push(fullImageURL);
      }
    });

    console.log("All Image URLs:");
    console.log(imageUrls);
  })
  .catch((err) => console.log("Error:", err));

