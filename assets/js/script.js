let cursorIcons = [
  "https://emojiapi.dev/api/v1/1f41f/64.png", // 🐟
  "https://emojiapi.dev/api/v1/1f421/64.png", // 🐡
  "https://emojiapi.dev/api/v1/1f420/64.png", // 🐠
];
let cursorIndex = 0;

function changeCursor() {
  document.body.style.cursor = `url('${cursorIcons[cursorIndex]}'), auto`;
  cursorIndex = (cursorIndex + 1) % cursorIcons.length;
}

setInterval(changeCursor, 3000);
