import {pickRandom } from "./utils"

//
// Penrose Tiling
//

// Penrose Tiling Variables
let triangles = []
const GOLDEN_RATIO = 0.6180339887498948482;

// Used to represent both points and vectors for simplicity
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromPoints(start, end) {
    return new Vector(end.x - start.x, end.y - start.y);
  }

  multiply(multiplier) {
    return new Vector(this.x * multiplier, this.y * multiplier);
  }

  add(anotherVector) {
    return new Vector(this.x + anotherVector.x, this.y + anotherVector.y);
  }
}

class Triangle {
  constructor(v1, v2, v3, fillColor) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;

    this.fillColor = fillColor;
    this.image = null;
  }

  draw(ctx) {
    // Store fill style in a temp variable, to set it back later
    // var tempFillStyle = ctx.fillStyle;

    ctx.fillStyle = this.fillColor;
    // ctx.beginPath();
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.lineTo(this.v3.x, this.v3.y);
    ctx.lineTo(this.v1.x, this.v1.y);
    // ctx.fill();

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
}

class ThinLeftTriangle extends Triangle {
  constructor(v1, v2, v3) {
    super(v1, v2, v3, "red");
  }

  split() {
    var vector_13 = Vector.fromPoints(this.v1, this.v3).multiply(GOLDEN_RATIO);
    var split_point_13 = this.v1.add(vector_13);

    var new_triangles = [];
    new_triangles.push(new ThinLeftTriangle(this.v2, this.v3, split_point_13));
    new_triangles.push(new ThickLeftTriangle(split_point_13, this.v1, this.v2));

    return new_triangles;
  }
}

class ThinRightTriangle extends Triangle {
  constructor(v1, v2, v3) {
    super(v1, v2, v3, "blue");
  }

  split() {
    var vector_12 = Vector.fromPoints(this.v1, this.v2).multiply(GOLDEN_RATIO);
    var split_point_12 = this.v1.add(vector_12);

    var new_triangles = [];
    new_triangles.push(new ThinRightTriangle(this.v3, split_point_12, this.v2));
    new_triangles.push(
      new ThickRightTriangle(split_point_12, this.v3, this.v1)
    );

    return new_triangles;
  }
}

class ThickLeftTriangle extends Triangle {
  constructor(v1, v2, v3) {
    super(v1, v2, v3, "yellow");
  }

  split() {
    var vector_32 = Vector.fromPoints(this.v3, this.v2).multiply(GOLDEN_RATIO);
    var split_point_32 = this.v3.add(vector_32);

    var vector_31 = Vector.fromPoints(this.v3, this.v1).multiply(GOLDEN_RATIO);
    var split_point_31 = this.v3.add(vector_31);

    var new_triangles = [];
    new_triangles.push(
      new ThickRightTriangle(split_point_31, split_point_32, this.v3)
    );
    new_triangles.push(
      new ThinRightTriangle(split_point_32, split_point_31, this.v1)
    );
    new_triangles.push(new ThickLeftTriangle(split_point_32, this.v1, this.v2));

    return new_triangles;
  }
}

class ThickRightTriangle extends Triangle {
  constructor(v1, v2, v3) {
    super(v1, v2, v3, "green");
  }

  split() {
    var vector_21 = Vector.fromPoints(this.v2, this.v1).multiply(GOLDEN_RATIO);
    var split_point_21 = this.v2.add(vector_21);

    var vector_23 = Vector.fromPoints(this.v2, this.v3).multiply(GOLDEN_RATIO);
    var split_point_23 = this.v2.add(vector_23);

    var new_triangles = [];
    new_triangles.push(
      new ThickRightTriangle(split_point_23, this.v3, this.v1)
    );
    new_triangles.push(
      new ThinLeftTriangle(split_point_23, this.v1, split_point_21)
    );
    new_triangles.push(
      new ThickLeftTriangle(split_point_21, this.v2, split_point_23)
    );

    return new_triangles;
  }
}

export function setupPenroseTiling(ctx, images) {
  var rounds = 3;
  var init_shape = "rectangle";

  if (init_shape === "rhombus") {
    var side = Math.min(canvas.width, canvas.height);
    var ratio = Math.sin(36 * (Math.PI / 180)) / Math.sin(54 * (Math.PI / 180));
    var t1 = new ThickRightTriangle(
      new Vector(side / 2.0, 0),
      new Vector(side, (side / 2.0) * ratio),
      new Vector(0, (side / 2.0) * ratio)
    );
    var t2 = new ThickLeftTriangle(
      new Vector(side / 2.0, side * ratio),
      new Vector(0, (side / 2.0) * ratio),
      new Vector(side, (side / 2.0) * ratio)
    );
    triangles.push(t1);
    triangles.push(t2);
  }

  if (init_shape === "rectangle") {
    var side = Math.min(canvas.width, canvas.height);

    var t1 = new ThinLeftTriangle(
      new Vector(0, 0),
      new Vector(canvas.width, canvas.height),
      new Vector(canvas.width, 0)
    );
    var t2 = new ThinLeftTriangle(
      new Vector(canvas.width, canvas.height),
      new Vector(0, canvas.height),
      new Vector(0, 0)
    );

    triangles.push(t1);
    triangles.push(t2);
  }

  // triangles.forEach(function(t) {
  //   t.draw(ctx);
  // });

  for (var round = 0; round < rounds; round++) {
    var new_triangles = [];

    for (var i = 0; i < triangles.length; i++) {
      var trig = triangles[i];
      new_triangles = new_triangles.concat(trig.split());
    }

    triangles = new_triangles;
  }

  const keys = ["yellow", "blue", "green", "red"];
  triangles = keys.map(key => {
    return {
      triangles: triangles.filter(i => i.fillColor === key),
      image: pickRandom(images)
    };
  });
  // triangles = {
  //   blue: triangles.filter((i)=> i.fillColor === "blue"),
  //   yellow: triangles.filter((i)=> i.fillColor === "yellow"),
  // }
}

export function drawPenroseTiling(ctx, x) {
  ctx.save();
  ctx.globalCompositeOperation = "color-burn";

  triangles.forEach(set => {
    let image = set.image;

    ctx.save();

    ctx.beginPath();
    set.triangles.forEach(function(t) {
      t.draw(ctx);
    });

    ctx.clip();

    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.restore();
  });

  ctx.restore();
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
  // ctx.restore()
}
