function imageZoom(a) {
  document.querySelector("#resultID").style.background = "";

  var img, lens, result, cx, cy;
  img = document.getElementById("imgID");
  result = document.getElementById("resultID");

  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");

  img.parentElement.insertBefore(lens, img);

  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  result.style.opacity = 0;
  result.style.zIndex = -1;
  lens.style.display = "none";

  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  img.addEventListener("mouseout", () => {
    result.style.opacity = 0;
    result.style.zIndex = -1;
    lens.style.display = "none";
  });

  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  lens.addEventListener("touchend", () => {
    result.classList.add("on");
    lens.style.display = "none";
  });
  function moveLens(e) {
    result.style.opacity = 1;
    result.style.zIndex = 10;
    lens.style.display = "block";
    var pos, x, y;

    e.preventDefault();

    pos = getCursorPos(e);

    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    lens.style.left = x / 10 + "rem";
    lens.style.top = y / 10 + "rem";
    result.style.left = img.width + 10 + "px";
    result.style.top = 0 + "px";

    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;

    a = img.getBoundingClientRect();

    x = e.pageX - a.left;
    y = e.pageY - a.top;

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}
