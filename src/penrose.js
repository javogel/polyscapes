import { pickRandom } from "./utils";

// Penrose Tiling Variables
const GOLDEN_RATIO = 0.6180339887498948482;
const globalCompositeOperations = [
  // "source-over",
  // "source-in",
  // "source-out",
  // "source-atop",
  // "destination-over",
  // "destination-in",
  // "destination-out",
  // "destination-atop",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity"
];

let triangles = [];
let currentGCO = pickRandom(globalCompositeOperations);
let minimumValToRender

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

    // ctx.fillStyle = this.fillColor;
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

function generateTriangles(ctx, init_shape, rounds){
  let trianglesArray = []
  if (init_shape === "rhombus") {
    var side = ctx.canvas.width

    var t1 = new ThickRightTriangle(
      new Vector(side / 2.0, 0),
      new Vector(side, ctx.canvas.height / 2),
      new Vector(0, ctx.canvas.height / 2)
    );
    var t2 = new ThickLeftTriangle(
      new Vector(side / 2.0, ctx.canvas.height),
      new Vector(0, ctx.canvas.height / 2),
      new Vector(side, ctx.canvas.height / 2)
    );
    trianglesArray.push(t1);
    trianglesArray.push(t2);
  }

  if (init_shape === "rectangle") {
    var side = Math.min(ctx.canvas.width, ctx.canvas.height);

    var t1 = new ThinLeftTriangle(
      new Vector(0, 0),
      new Vector(ctx.canvas.width, ctx.canvas.height),
      new Vector(ctx.canvas.width, 0)
    );
    var t2 = new ThinLeftTriangle(
      new Vector(ctx.canvas.width, ctx.canvas.height),
      new Vector(0, ctx.canvas.height),
      new Vector(0, 0)
    );

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
        var v2 = center.add(new Vector(Math.cos(grad_increment * (i+1)), Math.sin(grad_increment * (i+1))).multiply(r));
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

  return trianglesArray
}

export function setupPenroseTiling(ctx, images) {
  var rounds =   Math.floor(Math.random() * 8);
  var init_shape = pickRandom(["rectangle", "rhombus", "circle"]);
  currentGCO = pickRandom(globalCompositeOperations);

  triangles.length = 0;
  triangles = generateTriangles(ctx, init_shape, rounds)
  triangles = Object.values(groupBy(triangles, "fillColor"))

  minimumValToRender  = pickRandom([ 130])
  triangles = triangles.map(arr => {
    return {
      triangles: arr,
      rendered: [],
      image: pickRandom(images),
      gcu: pickRandom(globalCompositeOperations)
    };
  });

}

export function drawPenroseTiling(ctx, x, audio) {
  const MIN_VALUE_TO_CHANGE_SCENE = 20
  const PROBABILITY_GCO_CHANGE = 0.3

  ctx.save();
  ctx.globalCompositeOperation = currentGCO
  ctx.strokeStyle = "rgba(1, 1, 1, 0)";

  if (audio.domainArray[0] - 128 > MIN_VALUE_TO_CHANGE_SCENE) {
    if(Math.random() < PROBABILITY_GCO_CHANGE) {
      currentGCO = pickRandom(globalCompositeOperations);
    }
    setupPenroseTiling(ctx, audio.images);
  } else {
    triangles.forEach(set => {
      let image = set.image;
      ctx.beginPath();
      if (!set.triangles || set.triangles.length === 0) return;
      set.triangles.forEach(function(t, i) {
        // ctx.save();
        // const scale = audio.domainArray[i]/128
        // ctx.scale(scale*2, scale*2)
        const diff = audio.domainArray[i] > minimumValToRender;
        if (diff) {
          t.draw(ctx);
        }
        // ctx.restore();
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
      // ctx.restore();
    });
  }
  ctx.restore();
}


export function drawSequentialPenroseTiling(ctx, x, audio) {
  const MIN_VALUE_TO_CHANGE_SCENE = 153
  const PROBABILITY_GCO_CHANGE = 0.7

  ctx.save();
  ctx.globalCompositeOperation = currentGCO
  ctx.strokeStyle = "rgba(1, 1, 1, 0)";

  if (audio.domainArray[0] > MIN_VALUE_TO_CHANGE_SCENE) {
    if(Math.random() < PROBABILITY_GCO_CHANGE) {
      currentGCO = pickRandom(globalCompositeOperations);
    }
    setupPenroseTiling(ctx, audio.images);
  } else {
    triangles.forEach(set => {

   
      // ctx.globalCompositeOperation = set.gcu
      let image = set.image;
      // let trianglesLength = set.triangles.length
      ctx.beginPath();

      const diff = audio.domainArray[0] > minimumValToRender;
      if (diff && set.triangles.length > 0) {
        set.rendered.push(set.triangles.pop())
      }
     
      if (!set.triangles || !set.rendered || set.rendered.length === 0 ) return;
  

      set.rendered.forEach(function(t, i) {
        
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
      // ctx.restore();
    });
  }
  ctx.restore();
}



function sortByX(a, b){
  return Math.min(a.v1.x, a.v2.x, a.v3.x) - Math.min(b.v1.x, b.v2.x, b.v3.x)
}

function groupBy(arr, property){
  return arr.reduce(function (r, a) {
    const type = a[property]
    r[type] = r[type] || [];
    r[type].push(a);
    return r;
}, Object.create(null));
}