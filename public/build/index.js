'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

//
// UTILITIES 
//

/**
 * Pick random item from array.
 */
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
/**
 * Waits until document is ready to execute callback
 */

function onDocumentReady(f) {
  /in/.test(document.readyState) ? setTimeout("onDocumentReady(" + f + ")", 9) : f();
}

var GOLDEN_RATIO = 0.6180339887498948482;
var globalCompositeOperations = [// "source-over",
// "source-in",
// "source-out",
// "source-atop",
// "destination-over",
// "destination-in",
// "destination-out",
// "destination-atop",
"lighter", "copy", "xor", "multiply", "screen", "overlay", "darken", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
var triangles = [];
var currentGCO = pickRandom(globalCompositeOperations); // Used to represent both points and vectors for simplicity

var Vector =
/*#__PURE__*/
function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "multiply",
    value: function multiply(multiplier) {
      return new Vector(this.x * multiplier, this.y * multiplier);
    }
  }, {
    key: "add",
    value: function add(anotherVector) {
      return new Vector(this.x + anotherVector.x, this.y + anotherVector.y);
    }
  }], [{
    key: "fromPoints",
    value: function fromPoints(start, end) {
      return new Vector(end.x - start.x, end.y - start.y);
    }
  }]);

  return Vector;
}();

var Triangle =
/*#__PURE__*/
function () {
  function Triangle(v1, v2, v3, fillColor) {
    _classCallCheck(this, Triangle);

    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.fillColor = fillColor;
    this.image = null;
  }

  _createClass(Triangle, [{
    key: "draw",
    value: function draw(ctx) {
      // Store fill style in a temp variable, to set it back later
      // var tempFillStyle = ctx.fillStyle;
      ctx.fillStyle = this.fillColor; // ctx.beginPath();

      ctx.moveTo(this.v1.x, this.v1.y);
      ctx.lineTo(this.v2.x, this.v2.y);
      ctx.lineTo(this.v3.x, this.v3.y);
      ctx.lineTo(this.v1.x, this.v1.y); // ctx.fill();
      // ctx.strokeStyle = "white";
      // ctx.lineWidth = 1;
      // ctx.beginPath();
      // ctx.moveTo(this.v1.x, this.v1.y);
      // ctx.lineTo(this.v2.x, this.v2.y);
      // ctx.stroke();
      // ctx.moveTo(this.v1.x, this.v1.y);
      // ctx.lineTo(this.v3.x, this.v3.y);
      // ctx.stroke();
      // ctx.fillStyle = tempFillStyle;
    }
  }]);

  return Triangle;
}();

var ThinLeftTriangle =
/*#__PURE__*/
function (_Triangle) {
  _inherits(ThinLeftTriangle, _Triangle);

  function ThinLeftTriangle(v1, v2, v3) {
    _classCallCheck(this, ThinLeftTriangle);

    return _possibleConstructorReturn(this, _getPrototypeOf(ThinLeftTriangle).call(this, v1, v2, v3, "red"));
  }

  _createClass(ThinLeftTriangle, [{
    key: "split",
    value: function split() {
      var vector_13 = Vector.fromPoints(this.v1, this.v3).multiply(GOLDEN_RATIO);
      var split_point_13 = this.v1.add(vector_13);
      var new_triangles = [];
      new_triangles.push(new ThinLeftTriangle(this.v2, this.v3, split_point_13));
      new_triangles.push(new ThickLeftTriangle(split_point_13, this.v1, this.v2));
      return new_triangles;
    }
  }]);

  return ThinLeftTriangle;
}(Triangle);

var ThinRightTriangle =
/*#__PURE__*/
function (_Triangle2) {
  _inherits(ThinRightTriangle, _Triangle2);

  function ThinRightTriangle(v1, v2, v3) {
    _classCallCheck(this, ThinRightTriangle);

    return _possibleConstructorReturn(this, _getPrototypeOf(ThinRightTriangle).call(this, v1, v2, v3, "blue"));
  }

  _createClass(ThinRightTriangle, [{
    key: "split",
    value: function split() {
      var vector_12 = Vector.fromPoints(this.v1, this.v2).multiply(GOLDEN_RATIO);
      var split_point_12 = this.v1.add(vector_12);
      var new_triangles = [];
      new_triangles.push(new ThinRightTriangle(this.v3, split_point_12, this.v2));
      new_triangles.push(new ThickRightTriangle(split_point_12, this.v3, this.v1));
      return new_triangles;
    }
  }]);

  return ThinRightTriangle;
}(Triangle);

var ThickLeftTriangle =
/*#__PURE__*/
function (_Triangle3) {
  _inherits(ThickLeftTriangle, _Triangle3);

  function ThickLeftTriangle(v1, v2, v3) {
    _classCallCheck(this, ThickLeftTriangle);

    return _possibleConstructorReturn(this, _getPrototypeOf(ThickLeftTriangle).call(this, v1, v2, v3, "yellow"));
  }

  _createClass(ThickLeftTriangle, [{
    key: "split",
    value: function split() {
      var vector_32 = Vector.fromPoints(this.v3, this.v2).multiply(GOLDEN_RATIO);
      var split_point_32 = this.v3.add(vector_32);
      var vector_31 = Vector.fromPoints(this.v3, this.v1).multiply(GOLDEN_RATIO);
      var split_point_31 = this.v3.add(vector_31);
      var new_triangles = [];
      new_triangles.push(new ThickRightTriangle(split_point_31, split_point_32, this.v3));
      new_triangles.push(new ThinRightTriangle(split_point_32, split_point_31, this.v1));
      new_triangles.push(new ThickLeftTriangle(split_point_32, this.v1, this.v2));
      return new_triangles;
    }
  }]);

  return ThickLeftTriangle;
}(Triangle);

var ThickRightTriangle =
/*#__PURE__*/
function (_Triangle4) {
  _inherits(ThickRightTriangle, _Triangle4);

  function ThickRightTriangle(v1, v2, v3) {
    _classCallCheck(this, ThickRightTriangle);

    return _possibleConstructorReturn(this, _getPrototypeOf(ThickRightTriangle).call(this, v1, v2, v3, "green"));
  }

  _createClass(ThickRightTriangle, [{
    key: "split",
    value: function split() {
      var vector_21 = Vector.fromPoints(this.v2, this.v1).multiply(GOLDEN_RATIO);
      var split_point_21 = this.v2.add(vector_21);
      var vector_23 = Vector.fromPoints(this.v2, this.v3).multiply(GOLDEN_RATIO);
      var split_point_23 = this.v2.add(vector_23);
      var new_triangles = [];
      new_triangles.push(new ThickRightTriangle(split_point_23, this.v3, this.v1));
      new_triangles.push(new ThinLeftTriangle(split_point_23, this.v1, split_point_21));
      new_triangles.push(new ThickLeftTriangle(split_point_21, this.v2, split_point_23));
      return new_triangles;
    }
  }]);

  return ThickRightTriangle;
}(Triangle);

function setupPenroseTiling(ctx, images) {
  var rounds = Math.floor(Math.random() * 6);
  var init_shape = pickRandom(["rectangle", "rhombus", "circle"]);
  currentGCO = pickRandom(globalCompositeOperations);
  triangles.length = 0;

  if (init_shape === "rhombus") {
    var side = Math.min(ctx.canvas.width, ctx.canvas.width);
    var t1 = new ThickRightTriangle(new Vector(side / 2.0, 0), new Vector(side, ctx.canvas.height / 2), new Vector(0, ctx.canvas.height / 2));
    var t2 = new ThickLeftTriangle(new Vector(side / 2.0, ctx.canvas.height), new Vector(0, ctx.canvas.height / 2), new Vector(side, ctx.canvas.height / 2));
    triangles.push(t1);
    triangles.push(t2);
  }

  if (init_shape === "rectangle") {
    var side = Math.min(canvas.width, canvas.height);
    var t1 = new ThinLeftTriangle(new Vector(0, 0), new Vector(canvas.width, canvas.height), new Vector(canvas.width, 0));
    var t2 = new ThinLeftTriangle(new Vector(canvas.width, canvas.height), new Vector(0, canvas.height), new Vector(0, 0));
    triangles.push(t1);
    triangles.push(t2);
  }

  if (init_shape === 'circle') {
    var side = Math.min(canvas.width, canvas.height);
    var r = side / 2.0;
    var grad_increment = 36 * (Math.PI / 180);
    var center = new Vector(canvas.width / 2.0, canvas.height / 2.0);

    for (var i = 0; i < 10; i++) {
      var v1 = center.add(new Vector(Math.cos(grad_increment * i), Math.sin(grad_increment * i)).multiply(r));
      var v2 = center.add(new Vector(Math.cos(grad_increment * (i + 1)), Math.sin(grad_increment * (i + 1))).multiply(r));
      var trig_class;

      if (i % 2 == 0) {
        trig_class = ThinRightTriangle;
      } else {
        trig_class = ThinLeftTriangle;
      }

      var trig = new trig_class(center, v2, v1);
      triangles.push(trig);
    }
  }

  for (var round = 0; round < rounds; round++) {
    var new_triangles = [];

    for (var i = 0; i < triangles.length; i++) {
      var trig = triangles[i];
      new_triangles = new_triangles.concat(trig.split());
    }

    triangles = new_triangles;
  }

  var keys = ["yellow", "blue", "green", "red"];
  triangles = keys.map(function (key) {
    return {
      triangles: triangles.filter(function (i) {
        return i.fillColor === key;
      }),
      image: pickRandom(images)
    };
  });
}
function drawPenroseTiling(ctx, x, audio) {
  // if (Math.random() < 0.3) return;
  ctx.save();
  ctx.globalCompositeOperation = currentGCO;
  ctx.strokeStyle = "rgba(1, 1, 1, 0)";

  if (audio.domainArray[0] - 128 > 10) {
    // if(Math.random() < 0.3) {
    ctx.globalCompositeOperation = currentGCO = pickRandom(globalCompositeOperations); // }

    setupPenroseTiling(ctx, audio.images);
  } else {
    triangles.forEach(function (set) {
      var image = set.image;
      ctx.beginPath();
      if (!set.triangles || set.triangles.length === 0) return;
      set.triangles.forEach(function (t, i) {
        // ctx.save();
        // const scale = audio.domainArray[i]/128
        // ctx.scale(scale, scale)
        var diff = audio.domainArray[i] > 128;

        if (diff) {
          t.draw(ctx);
        } // ctx.restore();

      });
      ctx.clip();
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height); // ctx.restore();
    });
  } // ctx.restore();
  // const img2 = pickRandom(images)
  // ctx.save();
  // ctx.beginPath();
  // triangles.blue.forEach(function(t) {
  //   t.draw(ctx);
  // });
  // ctx.clip();
  // ctx.drawImage(
  //   img2,
  //   0,
  //   0,
  //   img2.width,
  //   img2.height,
  //   0,
  //   0,
  //   canvas.width,
  //   canvas.height
  // );


  ctx.restore();
}

//
// AUDIO API
//
var audioCtx;
var source;
var analyser;
function refreshAudioData(audio) {
  analyser.getByteTimeDomainData(audio.domainArray); // frequencyAnalyser.getByteFrequencyData(audioFrequencyArray)
}
function setupAudio(audio) {
  if (navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");

    var soundNotAllowed = function soundNotAllowed(error) {
      console.log("You must allow your microphone.");
    };

    navigator.getUserMedia({
      audio: true
    }, function (stream) {
      audioCtx = new AudioContext();
      source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser(); // frequencyAnalyser = audioCtx.createAnalyser();

      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
      analyser.fftSize = 512; // frequencyAnalyser.fftSize = 32;
      // frequencyAnalyser.minDecibels = -90;
      // frequencyAnalyser.maxDecibels = -10;
      // frequencyAnalyser.smoothingTimeConstant = 0.85;

      audio.domainArray = new Uint8Array(analyser.frequencyBinCount); // audioFrequencyArray = new Uint8Array(frequencyAnalyser.frequencyBinCount);

      source.connect(analyser); // analyser.connect(frequencyAnalyser)

      audio.audioReady = true;
    }, soundNotAllowed);
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

function backgroundImage(ctx, img) {
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawPolygon(ctx, centerX, centerY, img, time) {
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var audio = arguments.length > 6 ? arguments[6] : undefined;
  ctx.save();
  ctx.translate(centerX, centerY);
  var sides = options.sides;
  var size = options.size || 500;
  var radians = 0;

  if (options.rotation) {
    if (options.rotation.animated) {
      radians = 2 * Math.PI / 6 * time.getSeconds() + 2 * Math.PI / 6000 * time.getMilliseconds();
    }

    if (options.rotation.direction == "counter-clockwise") {
      radians = -radians;
    }

    if (options.rotation.offset) {
      radians += options.rotation.offset;
    }

    ctx.rotate(radians);
  }

  ctx.beginPath(); //ctx.moveTo (size * Math.cos(0), size *  Math.sin(0));

  if (options.sides == "circle") {
    ctx.arc(0, 0, size, 0, 2 * Math.PI);
  } else {
    // ctx.moveTo(size/2 * Math.sin(0), size/2 * Math.cos(0));
    for (var i = 1; i <= sides; i += 1) {
      var vertexSize = size / 2 + Math.abs(audio.domainArray[i] - 128) * 2;
      var x = Math.round(vertexSize * Math.sin(i * 2 * Math.PI / sides));
      var y = Math.round(vertexSize * Math.cos(i * 2 * Math.PI / sides));

      if (i === 1) {
        ctx.moveTo(x, y);
      }

      ctx.lineTo(x, y);
    }
  }

  if (options.outline) {
    // We are making the same polygon but 90% of the size to create an 'outline' from the delta.
    var innerPolygonSize = size * 0.45; //ctx.moveTo(innerPolygonSize * Math.cos(0), innerPolygonSize * Math.sin(0));

    if (options.sides == "circle") {
      ctx.arc(0, 0, innerPolygonSize, 0, 2 * Math.PI);
    } else {
      ctx.moveTo(innerPolygonSize * Math.sin(0), innerPolygonSize * Math.cos(0));

      for (var i = 1; i <= sides; i += 1) {
        var x = Math.round(innerPolygonSize * Math.sin(i * 2 * Math.PI / sides));
        var y = Math.round(innerPolygonSize * Math.cos(i * 2 * Math.PI / sides));
        ctx.lineTo(x, y);
      }
    }
  } // NOTE: this is SUPER SUPER important for drawing outlines!!


  ctx.clip("evenodd");

  if (options.rotation) {
    ctx.rotate(-radians);
  }

  ctx.translate(-centerX, -centerY);

  if (!options.orbiting) {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  }
}

function drawOscillator(ctx, img, audio) {
  var time = new Date();
  var cx = ctx.canvas.width / 2;
  var cy = ctx.canvas.height / 2;
  drawPolygon(ctx, cx, cy, img, time, {
    sides: audio.domainArray.length,
    size: 500,
    rotation: {
      offset: Math.PI * Math.random(),
      animated: true
    }
  }, audio);
}
function drawOscillatorSmall(ctx, img, audio) {
  var time = new Date();
  var cx = ctx.canvas.width / 2;
  var cy = ctx.canvas.height / 2;
  ctx.save(); // ctx.globalCompositeOperation="color-burn"

  drawPolygon(ctx, cx, cy, img, time, {
    sides: audio.domainArray.length,
    size: audio.domainArray[0] * 3,
    rotation: {
      offset: Math.PI * Math.random(),
      animated: true
    }
  }, audio);
  ctx.restore();
}

var images = shuffleArray(["forrest.jpeg", "desert.jpeg", "gradient.jpeg", "yosemite.jpeg", "snow.jpeg", "peak.jpeg"]);
var imageElements = [backgroundImage, //   verticalStripes,
//   horizontalStripes,
//   centeredCircle,
// triangle,
drawOscillator, drawOscillatorSmall, // circleOrbit,
drawPenroseTiling];

var audio = {
  domainArray: null,
  frequencyArray: null,
  audioReady: false
}; // Start of audio state

function draw() {
  requestAnimationFrame(draw);
  if (audio.audioReady === false) return;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  if (Math.random() < 0.3) {
    refreshAudioData(audio);
  } // canvas.width = body.offsetWidth;
  // canvas.height = body.offsetHeight;
  // backgroundImage(ctx, images[0])


  drawElements(imageElements, ctx);
}

function drawElements(elements, ctx) {
  elements.forEach(function (el, index) {
    ctx.save();
    el(ctx, images[index + 1], audio);
    ctx.restore();
  });
}

function loadImages() {
  images = images.map(function (src) {
    var img = new Image();
    img.src = src;
    return img;
  });
}

function setUpPolyscape() {
  document.body.addEventListener('click', function () {
    if (audio.audioReady === false) {
      setupAudio(audio);
    }
  });
  loadImages();
  audio.images = images;
  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;
  setupPenroseTiling(ctx, images);
  requestAnimationFrame(draw);
}

onDocumentReady(setUpPolyscape);
