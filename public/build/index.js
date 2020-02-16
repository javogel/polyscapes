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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
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
var sequentialTriangles = [];
var currentGCO = pickRandom(globalCompositeOperations);
var minimumValToRender; // Used to represent both points and vectors for simplicity

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
      // ctx.fillStyle = this.fillColor;
      // ctx.beginPath();
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

function generateTriangles(ctx, init_shape, rounds) {
  var trianglesArray = [];

  if (init_shape === "rhombus") {
    var side = ctx.canvas.width;
    var t1 = new ThickRightTriangle(new Vector(side / 2.0, 0), new Vector(side, ctx.canvas.height / 2), new Vector(0, ctx.canvas.height / 2));
    var t2 = new ThickLeftTriangle(new Vector(side / 2.0, ctx.canvas.height), new Vector(0, ctx.canvas.height / 2), new Vector(side, ctx.canvas.height / 2));
    trianglesArray.push(t1);
    trianglesArray.push(t2);
  }

  if (init_shape === "rectangle") {
    var side = Math.min(ctx.canvas.width, ctx.canvas.height);
    var t1 = new ThinLeftTriangle(new Vector(0, 0), new Vector(ctx.canvas.width, ctx.canvas.height), new Vector(ctx.canvas.width, 0));
    var t2 = new ThinLeftTriangle(new Vector(ctx.canvas.width, ctx.canvas.height), new Vector(0, ctx.canvas.height), new Vector(0, 0));
    trianglesArray.push(t1);
    trianglesArray.push(t2);
  }

  if (init_shape === 'circle') {
    var side = Math.min(ctx.canvas.width, ctx.canvas.height);
    var r = side / 2.0;
    var grad_increment = 36 * (Math.PI / 180);
    var center = new Vector(ctx.canvas.width / 2.0, ctx.canvas.height / 2.0);

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
      trianglesArray.push(trig);
    }
  }

  for (var round = 0; round < rounds; round++) {
    var new_triangles = [];

    for (var i = 0; i < trianglesArray.length; i++) {
      var trig = trianglesArray[i];
      new_triangles = new_triangles.concat(trig.split());
    }

    trianglesArray = new_triangles;
  }

  return trianglesArray;
}

function setupPenroseTiling(ctx, images) {
  var rounds = 1 + Math.floor(Math.random() * 6);
  var init_shape = pickRandom(["rectangle", "rhombus", "circle"]);
  currentGCO = pickRandom(globalCompositeOperations);
  triangles.length = 0;
  triangles = generateTriangles(ctx, init_shape, rounds);
  triangles = Object.values(groupBy(triangles, "fillColor"));
  minimumValToRender = pickRandom([110, 130]);
  triangles = triangles.map(function (arr) {
    return {
      triangles: arr,
      rendered: [],
      image: pickRandom(images),
      gcu: pickRandom(globalCompositeOperations)
    };
  });
}
function setupSequentialPenroseTiling(ctx, images) {
  var rounds = 1 + Math.floor(Math.random() * 6);
  var init_shape = pickRandom(["rectangle", "rhombus", "circle"]);
  currentGCO = pickRandom(globalCompositeOperations);
  sequentialTriangles.length = 0;
  sequentialTriangles = generateTriangles(ctx, init_shape, rounds);
  sequentialTriangles = Object.values(groupBy(sequentialTriangles, "fillColor"));
  minimumValToRender = pickRandom([130]);
  sequentialTriangles = sequentialTriangles.map(function (arr) {
    return {
      triangles: arr,
      rendered: [],
      image: pickRandom(images),
      gcu: pickRandom(globalCompositeOperations)
    };
  });
}

function groupBy(arr, property) {
  return arr.reduce(function (r, a) {
    var type = a[property];
    r[type] = r[type] || [];
    r[type].push(a);
    return r;
  }, Object.create(null));
}

var Vector$1 =
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
  }, {
    key: "magnitude",
    value: function magnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }], [{
    key: "fromPoints",
    value: function fromPoints(start, end) {
      return new Vector(end.x - start.x, end.y - start.y);
    }
  }]);

  return Vector;
}();

var MovingBall =
/*#__PURE__*/
function () {
  function MovingBall(id, radius, position, velocity) {
    _classCallCheck(this, MovingBall);

    this.id = id;
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
    this.mass = Math.PI * this.radius * this.radius; // Set mass to the area
  }

  _createClass(MovingBall, [{
    key: "move",
    value: function move() {
      this.position.x = this.position.x + this.velocity.x;
      this.position.y = this.position.y + this.velocity.y;
    }
  }, {
    key: "angle",
    value: function angle() {
      return Math.atan2(this.velocity.y, this.velocity.x);
    }
  }], [{
    key: "delta",
    value: function delta(ballA, ballB) {
      var deltaX = ballB.position.x - ballA.position.x;
      var deltaY = ballB.position.y - ballA.position.y;
      return new Vector$1(deltaX, deltaY);
    }
  }, {
    key: "velocityDelta",
    value: function velocityDelta(ballA, ballB) {
      var deltaX = ballB.velocity.x - ballA.velocity.x;
      var deltaY = ballB.velocity.y - ballA.velocity.y;
      return new Vector$1(deltaX, deltaY);
    }
  }, {
    key: "dotProduct",
    value: function dotProduct(ballA, ballB) {
      var delta = new Vector$1(ballA.position.x - ballB.position.x, ballA.position.y - ballB.position.y);
      var deltaVelocity = new Vector$1(ballB.velocity.x - ballA.velocity.x, ballB.velocity.y - ballA.velocity.y);
      return delta.x * deltaVelocity.x + delta.y * deltaVelocity.y;
    }
  }, {
    key: "distanceSquared",
    value: function distanceSquared(ballA, ballB) {
      var dx = ballA.position.x - ballB.position.x;
      var dy = ballA.position.y - ballB.position.y;
      return dx * dx + dy * dy;
    }
  }, {
    key: "touching",
    value: function touching(ballA, ballB) {
      var threshold = (ballA.radius + ballB.radius) * (ballA.radius + ballB.radius);
      return MovingBall.distanceSquared(ballA, ballB) <= threshold;
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(ballA, ballB) {
      return MovingBall.touching(ballA, ballB) && MovingBall.dotProduct(ballA, ballB) > 0;
    }
  }, {
    key: "collisionAngle",
    value: function collisionAngle(ballA, ballB) {
      var delta = MovingBall.delta(ballA, ballB);
      return Math.atan2(delta.y, delta.x);
    }
  }, {
    key: "collisionMagnitude",
    value: function collisionMagnitude(ballA, ballB) {
      return MovingBall.dotProduct(ballA, ballB) / MovingBall.distanceSquared(ballA, ballB);
    }
  }, {
    key: "calculateCollisionVelocities",
    value: function calculateCollisionVelocities(ballA, ballB) {
      var collisionMagnitude = MovingBall.collisionMagnitude(ballA, ballB);
      var collisionVector = new Vector$1((ballA.position.x - ballB.position.x) * collisionMagnitude, (ballA.position.y - ballB.position.y) * collisionMagnitude);
      var combinedMass = ballA.mass + ballB.mass;
      var collisionRatioA = 2 * ballB.mass / combinedMass;
      var collisionRatioB = 2 * ballA.mass / combinedMass;
      var newVelocityA = new Vector$1(ballA.velocity.x + collisionRatioA * collisionVector.x, ballA.velocity.y + collisionRatioA * collisionVector.y);
      var newVelocityB = new Vector$1(ballB.velocity.x - collisionRatioB * collisionVector.x, ballB.velocity.y - collisionRatioB * collisionVector.y);
      return [newVelocityA, newVelocityB];
    }
  }, {
    key: "collisionPoint",
    value: function collisionPoint(ballA, ballB) {
      var collisionAngle = MovingBall.collisionAngle(ballA, ballB);
      var dx = ballB.position.x - ballA.position.x;
      var dy = ballB.position.y - ballA.position.y;
      return new Vector$1(ballA.position.x + ballA.radius * Math.cos(collisionAngle), ballA.position.y + ballA.radius * Math.sin(collisionAngle));
    }
  }]);

  return MovingBall;
}();

var Pulsor =
/*#__PURE__*/
function () {
  function Pulsor(id, position) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Pulsor);

    this.id = id;
    this.position = position;
    this.growthRate = options.growthRate || 4;
    this.pulsePeriod = options.pulsePeriod || 32;
    this.numPulseThreshold = options.numPulseThreshold || 10;
    this.sizePulseThreshold = options.sizePulseThreshold || 150;
    this.pulses = [new Pulse(0)];
    this.stopPulsing = false;
  }

  _createClass(Pulsor, [{
    key: "pulse",
    value: function pulse() {
      if (this.stopPulsing) {
        return;
      }

      this.pulses.push(new Pulse(0));
    }
  }, {
    key: "isDead",
    value: function isDead() {
      return this.stopPulsing && this.pulses.length === 0;
    }
  }, {
    key: "killPulse",
    value: function killPulse(index) {
      this.pulses.splice(index, 1);
    }
  }, {
    key: "grow",
    value: function grow() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.pulses.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              pulse = _step$value[1];

          pulse.grow(this.growthRate);

          if (pulse.size % this.pulsePeriod === 0) {
            this.pulse();
          }

          if (this.pulses.length > this.numPulseThreshold) {
            this.stopPulsing = true;
          }

          if (pulse.size > this.sizePulseThreshold) {
            this.killPulse(index);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "drawPulses",
    value: function drawPulses(ctx, img, audio) {
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.beginPath();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.pulses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var pulse = _step2.value;
          pulse.draw(ctx, img, audio, this.growthRate);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      ctx.clip('evenodd');
      ctx.translate(-this.position.x, -this.position.y);
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
      ctx.restore();
      this.grow();
    }
  }]);

  return Pulsor;
}();

var Pulse =
/*#__PURE__*/
function () {
  function Pulse(size) {
    _classCallCheck(this, Pulse);

    this.size = size;
  }

  _createClass(Pulse, [{
    key: "grow",
    value: function grow(delta) {
      this.size += delta;
    }
  }, {
    key: "draw",
    value: function draw(ctx, img, audio, growthRate) {
      var differential = Math.min(this.size * 0.05, growthRate);
      ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
      ctx.arc(0, 0, this.size - differential, 0, 2 * Math.PI);
    }
  }]);

  return Pulse;
}();

var movingBalls = [];
var pulsors = [];
function setupMovingObjets(ctx, _images) {
  var numBalls = Math.floor(Math.random() * 10);
  var i = 0;

  while (i < numBalls) {
    var velocity = new Vector$1(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
    var radius = Math.random() * 150;
    var startingPoint = new Vector$1(Math.floor(Math.random() * ctx.canvas.width), Math.floor(Math.random() * ctx.canvas.height));

    if (startingPoint.x - radius < 0) {
      startingPoint.x += radius;
    }

    if (startingPoint.x + radius > ctx.canvas.width) {
      startingPoint.x -= radius;
    }

    if (startingPoint.y - radius < 0) {
      startingPoint.y += radius;
    }

    if (startingPoint.y + radius > ctx.canvas.height) {
      startingPoint.y -= radius;
    }

    var newBall = new MovingBall(i, radius, startingPoint, velocity);
    var collision = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = movingBalls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var ball = _step.value;

        if (MovingBall.touching(ball, newBall)) {
          collision = true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!collision) {
      i++;
      movingBalls.push(newBall);
    }
  }
}
function drawMovingBalls(ctx, img, audio) {
  ctx.save();
  ctx.beginPath();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = movingBalls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var ball = _step2.value;
      ctx.moveTo(ball.position.x, ball.position.y);
      ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, 2 * Math.PI);
      executeCollisionBall(ball, ctx);
      executeCollisionWall(ball, ctx);
      ball.move();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
  ctx.clip('evenodd');
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
function drawPulses(ctx, img, audio) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = pulsors.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 2),
          index = _step3$value[0],
          pulsor = _step3$value[1];

      pulsor.drawPulses(ctx, img, audio);
      pulsor.grow();

      if (pulsor.isDead()) {
        pulsors.splice(index, 1);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function executeCollisionWall(ball, ctx) {
  var projectedPoint = new Vector$1(ball.position.x + ball.velocity.x, ball.position.y + ball.velocity.y);

  if (projectedPoint.x > ctx.canvas.width - ball.radius || projectedPoint.x < ball.radius) {
    ball.velocity.x = -ball.velocity.x;
  }

  if (projectedPoint.y > ctx.canvas.height - ball.radius || projectedPoint.y < ball.radius) {
    ball.velocity.y = -ball.velocity.y;
  }
}

function executeCollisionBall(ball) {
  for (var i = ball.id; i < movingBalls.length; i++) {
    if (!movingBalls[i]) {
      continue;
    }

    if (ball.id === movingBalls[i].id) {
      continue;
    }

    if (!MovingBall.checkCollision(ball, movingBalls[i])) {
      continue;
    }

    var collisionPoint = MovingBall.collisionPoint(ball, movingBalls[i]);

    var _MovingBall$calculate = MovingBall.calculateCollisionVelocities(ball, movingBalls[i]),
        _MovingBall$calculate2 = _slicedToArray(_MovingBall$calculate, 2),
        newVelocityA = _MovingBall$calculate2[0],
        newVelocityB = _MovingBall$calculate2[1];

    ball.velocity = newVelocityA;
    movingBalls[i].velocity = newVelocityB;
    var collisionMagnitude = MovingBall.collisionMagnitude(ball, movingBalls[i]);
    console.log("collision magnitude " + collisionMagnitude);
    pulsors.push(new Pulsor(pulsors.length, collisionPoint));
  }
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

var images = shuffleArray(["forrest.jpeg", "desert.jpeg", // "gradient.jpeg",
// "yosemite.jpeg",
// "snow.jpeg",
"peak.jpeg", "tree.jpeg", // "city.jpeg",
"bark.jpeg", "ocean.jpeg", "ocean2.jpeg", "purple-sky.jpeg", "white-trees.jpeg" // "orange-tree.jpeg"
]);
var imageElements = [backgroundImage, //   verticalStripes,
//   horizontalStripes,
//   centeredCircle,
// triangle,
//drawPenroseTiling,
//drawOscillator,
//drawSequentialPenroseTiling,
//drawOscillatorSmall,
// circleOrbit,
drawPulses, drawMovingBalls];

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
  } // backgroundImage(ctx, images[0])


  drawElements(imageElements, ctx);
}

function drawElements(elements, ctx) {
  elements.forEach(function (el, index) {
    ctx.save();
    el(ctx, images[index], audio);
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
  var userInteractedCallback = function userInteractedCallback() {
    if (audio.audioReady === false) {
      setupAudio(audio);
    }
  };

  document.body.addEventListener("click", userInteractedCallback);
  document.body.addEventListener("touchstart", userInteractedCallback, false);
  loadImages();
  audio.images = images;
  var body = document.getElementsByTagName("body")[0];
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = body.offsetWidth;
  canvas.height = body.offsetHeight;
  setupPenroseTiling(ctx, images);
  setupSequentialPenroseTiling(ctx, images);
  setupMovingObjets(ctx);
  requestAnimationFrame(draw);
}

onDocumentReady(setUpPolyscape);
