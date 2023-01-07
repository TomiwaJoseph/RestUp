import restaurantImage from "./statics/restaurant.jpg";
import aboutImage from "./statics/about-us.jpg";
import contactImage from "./statics/contact-us.jpg";

import img1 from "./statics/img-01.jpg";
import img2 from "./statics/item-6.jpeg";
import img3 from "./statics/item-5.jpeg";
import img4 from "./statics/item-2.jpeg";
import img5 from "./statics/item-8.jpeg";
import img6 from "./statics/item-4.jpeg";
import img7 from "./statics/item-7.jpeg";
import img8 from "./statics/item-1.jpeg";
import img9 from "./statics/img-02.jpg";
import img10 from "./statics/img-03.jpg";
import img11 from "./statics/img-07.jpg";
import img12 from "./statics/img-09.jpg";
import img13 from "./statics/img-08.jpg";
import img14 from "./statics/img-05.jpg";
import img15 from "./statics/img-04.jpg";
import img16 from "./statics/menu-5.jpg";

import hotel1 from "./statics/pexels-pixabay-261101.jpg";
import hotel2 from "./statics/bg_1.jpg";
import hotel3 from "./statics/pexels-donald-tong-189296.jpg";

import testiImage1 from "./statics/person-1_rfzshl.jpg";
import testiImage2 from "./statics/person-1_aufeoq.jpg";
import testiImage3 from "./statics/person-3_rxtqvi.jpg";

export const testimonials = [
  {
    id: 1,
    name: "Stephanie Miller",
    image: testiImage1,
    review:
      "If you’re looking for a top quality hotel look no further. We were upgraded free of charge to the Premium Suite.",
  },
  {
    id: 2,
    name: "John Smith",
    image: testiImage2,
    review:
      "Me and my wife had a delightful weekend get away here, the staff were so friendly and attentive.",
  },
  {
    id: 3,
    name: "Jane Rosabel",
    image: testiImage3,
    review:
      "The hotel's restaurant, swimming pool, gym and bar is top notch. Amazing room and customer service.",
  },
];

export const hotelBranches = [
  {
    id: 1,
    name: "Bhutan",
    image: hotel1,
  },
  {
    id: 2,
    name: "Vanuatu",
    image: hotel2,
  },
  {
    id: 3,
    name: "Kiribati",
    image: hotel3,
  },
];

export const menuData = [
  {
    id: 16,
    image: img16,
    title: "Lamb Tomato",
    price: 28,
    category: "Dinner",
  },
  {
    id: 1,
    image: img1,
    title: "Godzilla Milkshake",
    price: 25,
    category: "Drinks",
  },
  {
    id: 2,
    image: img4,
    title: "Diner Double",
    price: 15,
    category: "Lunch",
  },
  {
    id: 13,
    image: img13,
    title: "Potato Cheese",
    price: 15,
    category: "Dinner",
  },
  {
    id: 3,
    image: img9,
    title: "Quarantine Buddy",
    price: 10,
    category: "Drinks",
  },
  {
    id: 14,
    image: img14,
    title: "Vegetable Stir-fry",
    price: 15,
    category: "Dinner",
  },
  {
    id: 4,
    image: img6,
    title: "Country Delight",
    price: 15,
    category: "Lunch",
  },
  {
    id: 15,
    image: img15,
    title: "Burger Perhaps",
    price: 15,
    category: "Lunch",
  },
  {
    id: 5,
    image: img3,
    title: "Egg Attack",
    price: 10,
    category: "Lunch",
  },
  {
    id: 10,
    image: img10,
    title: "Fancy Gulp",
    price: 13,
    category: "Drinks",
  },
  {
    id: 6,
    image: img2,
    title: "Oreo Dream",
    price: 12,
    category: "Drinks",
  },
  {
    id: 7,
    image: img7,
    title: "Bacon Overflow",
    price: 15,
    category: "Lunch",
  },
  {
    id: 8,
    image: img5,
    title: "American Classic",
    price: 18,
    category: "Lunch",
  },
  {
    id: 12,
    image: img12,
    title: "Pork Chops",
    price: 13,
    category: "Dinner",
  },
  {
    id: 9,
    image: img8,
    title: "Buttermilk Pancakes",
    price: 13,
    category: "Lunch",
  },
  {
    id: 11,
    image: img11,
    title: "Baked Chicken",
    price: 13,
    category: "Dinner",
  },
];

export const hero = {
  restaurant: restaurantImage,
  // room: roomImage,
  about: aboutImage,
  contact: contactImage,
};
