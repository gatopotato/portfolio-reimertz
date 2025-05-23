require("es6-promise").polyfill();

import Writer from "./modules/Writer";
import Translater from "./modules/Translater";
import RickRolled from "./modules/RickRolled";
import LazyLoader from "./modules/LazyLoader";
import CursorFriend from "./modules/CursorFriend";
import NightMode from "./modules/NightMode";

const echo = require("echo-js")(document.body);
const introText = `hi, my name is samkit jaina.

i am a humble developer@@@#########magician@@@########coder, fake-it-til-you-make-it#######################entrepreneur and problem solver.

$http://github.com/gatopotato$github$ | $http://twitter.com/samkitjaina$twitter$ | $https://www.linkedin.com/in/gatopotato$linkedin$ | $mailto:samkitjaina.ind@gmail.com$hire me$ `;

const writer = new Writer(document.querySelectorAll(".writer"), introText);
const translater = new Translater(document.querySelector(".tre-d"), 10, 10);
const rr = new RickRolled(
  5000,
  true,
  document.querySelector("all-my-secret-api-keys")
);
const ll = new LazyLoader({
  lines: 5,
  throttle: 500,
  checkOnStart: false,
  fakeSlowness: {
    delayBeforeFetch: () => {
      return Math.random() * 3500 + 1000;
    },
    percentageOfImages: 0.3,
  },
});

const cF = new CursorFriend({ selector: ".project" });
requestAnimationFrame(() => {
  writer.start();
  translater.start();
  rr.start();
  ll.start();
  cF.start();
});
