"use strict";

let canvas;
function setTransformPerspectiveListener() {
  $(document).mousemove(transformPerspective);
}

function setMouseOverListeners() {
  $(".social")
    .children()
    .mouseover(mouseOverSocialIcon)
    .mouseout(mouseOutSocialIcon);
}

function main() {
  setMouseOverListeners();
  setTransformPerspectiveListener();
  canvas = new BubbleCanvas();
  window.requestAnimationFrame(getAnimationFrame);
}
function Point(x, y) {
  this.x = x;
  this.y = y;
  this.translate = function (x, y) {
    this.x += x;
    this.y += y;
  };

  this.wrappingTranslate = function (x, y, minX, minY, maxX, maxY) {
    this.x += x; // (this.x + x) % maxX;
    this.y += y; // (this.y + y) % maxY;
    if (this.x > maxX) {
      this.x = MIN_X;
    }
  };
}

function Bubble(name, highlightedColor, link = undefined, radius = 50) {
  const NORMAL_COLOR = "#efd800"; //'#d3b900';
  let BACKGROUND_COLOR = NORMAL_COLOR; //'#555'//'#ffee00';

  this.point = new Point(
    getRandomArbitrary(0, window.innerWidth),
    getRandomArbitrary(0, window.innerHeight)
  );
  this.radius = 50;
  this.highlightedColor = highlightedColor;
  this.speedX = nonzeroRandomArbitrary(-1, 2);
  this.speedY = nonzeroRandomArbitrary(-1, 2);
  this.link = link;
  this.move = function () {
    this.point.translate(this.speedX, this.speedY);
    const maxX = window.innerWidth + this.radius;
    const maxY = window.innerHeight + this.radius;

    if (this.point.x > window.innerWidth + this.radius) {
      this.point.x = -this.radius;
    } else if (this.point.x < -this.radius) {
      this.point.x = maxX;
    }
    if (this.point.y > window.innerHeight + this.radius) {
      this.point.y = -this.radius;
    } else if (this.point.y < -this.radius) {
      this.point.y = maxY;
    }
  };
  this.baseImageName = name;
  this.draw = function (ctx) {
    ctx.beginPath();

    if (!this.highlighted) {
      this.move();
    }
    ctx.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, true);

    ctx.strokeStyle = this.highlighted ? this.highlightedColor : NORMAL_COLOR;
    ctx.lineWidth = 5;
    ctx.fillStyle = this.highlighted ? "white" : NORMAL_COLOR; //BACKGROUND_COLOR;
    // ctx.stroke();
    ctx.fill();
    ctx.drawImage(
      this.image,
      this.point.x - this.image.width / 2,
      this.point.y - this.image.height / 2
    );
  };

  this.setHighlighted = function (highlighted) {
    if (this.highlighted != highlighted) {
      this.image = new Image();
      let ext = highlighted ? "-highlighted.gif" : ".gif";
      this.image.src = "./build/img/bubbles/" + this.baseImageName + ext;
    }
    this.highlighted = highlighted;
  };
  this.setHighlighted(false);
}
function BubbleCanvas() {
  function intersectsBubble(bubble, x, y) {
    let a = bubble.point.x - x;
    let b = bubble.point.y - y;
    return Math.sqrt(a * a + b * b) <= bubble.radius;
  }

  this.findIntersectingBubbles = function (x, y) {
    let output = [];
    this.bubbles.forEach(function (bubble) {
      if (intersectsBubble(bubble, x, y)) {
        output.push(bubble);
      }
    });
    return output;
  };

  this.hasContext = function () {
    return this.canvasElement.getContext;
  };
  this.getContext = function () {
    let ctx = this.canvasElement.getContext("2d");
    ctx.save();
    return ctx;
  };
  this.updateSize = function () {
    this.canvasElement.width = window.innerWidth;
    this.canvasElement.height = window.innerHeight;
  };

  this.clearCanvas = function () {
    this.getContext().clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  };

  this.drawFrame = function (callback) {
    this.clearCanvas();
    if (this.hasContext()) {
      let ctx = this.getContext();
      this.draw(ctx);
      ctx.restore();
      window.requestAnimationFrame(getAnimationFrame);
    }
  };

  this.draw = function (ctx) {
    this.bubbles.forEach(function (b) {
      b.draw(ctx);
    });
  };

  this.init = function () {
    this.bubbles = [
      new Bubble("llama", "#B24592", "https://llamalists.com"),
      new Bubble("zap", "#0040d2", "https://dailyzap.app"),
      new Bubble("blog", "#", "https://blog.dqlobo.com"),
      new Bubble("upright", "#", "https://uprightlabs.com"),
      new Bubble("llama", "#B24592", "https://llamalists.com"),
      new Bubble("zap", "#0040d2", "https://dailyzap.app"),
      new Bubble("blog", "#", "https://blog.dqlobo.com"),
      new Bubble("upright", "#", "https://uprightlabs.com"),
    ];
    this.canvasElement = document.getElementById("bubbleCanvas");

    let currentCanvas = this;
    this.canvasElement.addEventListener(
      "click",
      function (event) {
        let x = event.offsetX;
        let y = event.offsetY;
        let selected = currentCanvas.findIntersectingBubbles(x, y).pop();
        // window.location.replace('https://google.com');
      },
      false
    );
    this.canvasElement.addEventListener(
      "mousemove",
      function (event) {
        let x = event.offsetX;
        let y = event.offsetY;
        let selected = currentCanvas.findIntersectingBubbles(x, y).pop();
        currentCanvas.bubbles.forEach(function (bubble) {
          bubble.setHighlighted(bubble == selected);
        });
        if (selected == undefined || !selected.link) {
          currentCanvas.canvasElement.style.cursor = "default";
          currentCanvas.canvasElement.parentElement.removeAttribute("href");
        } else {
          currentCanvas.canvasElement.style.cursor = "pointer";
          currentCanvas.canvasElement.parentElement.href = selected.link;
        }
      },
      false
    );

    this.updateSize();
  };
  this.init();
}

// HELPERS
function prefixStyles(styleDict) {
  let output = {};
  for (let key in styleDict) {
    let val = styleDict[key];
    output[key] = val;
    output["-webkit-" + key] = val;
    output["-moz-" + key] = val;
    output["-o-" + key] = val;
    output["-ms-" + key] = val;
  }
  return output;
}

function transformPerspective(event) {
  let mid = $(document).width() / 2.0;
  let multiplier = (mid - event.pageX) / mid;
  let amount = -10 * multiplier;
  $(".content").css(
    prefixStyles({
      transform: "perspective(1000px) rotateY(" + amount + "deg)",
    })
  );
  $(".content").css({
    "box-shadow": -amount * 3 + "px 20px 25px rgba(0,0,0,0.5)",
  });
}

function mouseOverSocialIcon(event) {
  $(event.target).stop().animate({ top: "-5px" }, 300);
}

function mouseOutSocialIcon(event) {
  $(event.target).stop().animate({ top: "0" }, 300);
}

function didUpdateWindowSize() {
  canvas.updateSize();
}
function getAnimationFrame() {
  canvas.drawFrame();
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function nonzeroRandomArbitrary(min, max) {
  let random = 0;
  while (random == 0) {
    random = getRandomArbitrary(min, max);
  }
  return random;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = main;
window.onresize = didUpdateWindowSize;
