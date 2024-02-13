const elements = document.querySelectorAll(".scroll");
let tickling = false;

window.addEventListener("scroll", function (e) {
  if (!tickling) {
    this.window.requestAnimationFrame(() => {
      shiftAlbum();
      tickling = false;
    });
    tickling = true;
  }
});

function shiftAlbum() {
  const album = document.getElementById("album");
  const albumHeight = album.offsetHeight;
  let dist = getElementDistanceFromViewportTop(album);
  if (dist < 0) {
    dist = 0;
  } else if (dist > albumHeight) {
    dist = albumHeight;
  }
  let ratio = (dist / albumHeight) * 10 - 10;
  console.log(ratio);
  elements.forEach((element) => {
    element.style.transform = "translateY(" + ratio + "vh)";
  });
}

function getElementDistanceFromViewportTop(el) {
  var rect = el.getBoundingClientRect();
  return rect.top * -1 + window.innerHeight / 2;
}
