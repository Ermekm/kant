const elements = document.querySelectorAll(".album__col");
let tickling = false;

window.addEventListener("resize", function () {
  if (window.innerWidth < 992) {
    let element = document.getElementById("album__grid");
    element.removeAttribute("style");
  }
});

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
  const album = document.getElementById("album__grid");
  let albumHeight = album.offsetHeight;
  let dist = getElementDistanceFromViewportTop(album);
  if (window.innerWidth < 992) {
    dist += window.innerHeight / 2;
  } else {
    dist -= albumHeight /3
    albumHeight /=2 
  }
  if (dist < 0) {
    dist = 0;
  } else if (dist > albumHeight) {
    dist = albumHeight;
  }
  let albumShiftRatio = (dist / albumHeight) * 5 - 5;
  if (window.innerWidth > 991) {
    albumShiftRatio *= 2;
  }
  console.log(dist)
  console.log(albumHeight);
  elements.forEach((element) => {
    albumShiftRatio *= -1;
    // element.style.transform = "translateY(" + albumShiftRatio + "vh)";
    element.style.transform =
      "translate3d(0px," +
      albumShiftRatio +
      "vh, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
  });

  if (window.innerWidth > 991) {
    let endOfAnimationPosY = albumHeight - albumHeight / 2;
    let distToEndOfAnimationY = endOfAnimationPosY - window.scrollY;
    if (distToEndOfAnimationY < 0) {
      distToEndOfAnimationY = 0;
    } else if (distToEndOfAnimationY > endOfAnimationPosY) {
      distToEndOfAnimationY = endOfAnimationPosY;
    }
    const rotateRatio = distToEndOfAnimationY / endOfAnimationPosY;
    changeContentWidth(rotateRatio);
    rotateAlbum(rotateRatio);
  }
}

function rotateAlbum(rotateRatio) {
  const translate3d = 40 * rotateRatio;
  const scale3d = 0.8 + 0.2 * (1 - rotateRatio);
  const rotateX = 15 * rotateRatio;
  const rotateY = -9 * rotateRatio;
  const rotateZ = 32 * rotateRatio;
  let albumGridEl = document.getElementById("album__grid");
  albumGridEl.style.transform =
    "translate3d(" +
    translate3d +
    "%, 0px, 0px) scale3d(" +
    scale3d +
    "," +
    scale3d +
    ", 1) rotateX(" +
    rotateX +
    "deg) rotateY(" +
    rotateY +
    "deg) rotateZ(" +
    rotateZ +
    "deg) skew(0deg, 0deg)";
}

function changeContentWidth(rotateRatio) {
  const contentEl = document.getElementById("content");
  const contentWidthPercent = rotateRatio * 50;
  contentEl.style.width = contentWidthPercent + "%";
}

function getElementDistanceFromViewportTop(el) {
  var rect = el.getBoundingClientRect();
  return rect.top * -1;
}
