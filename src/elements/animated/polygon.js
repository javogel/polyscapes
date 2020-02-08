export function drawPolygon(ctx, centerX, centerY, img, time, options = {}, audio) {
    ctx.save();
    
    ctx.translate(centerX, centerY);
  
    var sides = options.sides;
    var size = options.size || 500;
    var radians = 0;
  
    if (options.rotation) {
      if (options.rotation.animated) {
        radians =
          ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds();
      }
      if (options.rotation.direction == "counter-clockwise") {
        radians = -radians;
      }
      if (options.rotation.offset) {
        radians += options.rotation.offset;
      }
  
      ctx.rotate(radians);
    }
  
    ctx.beginPath();
    //ctx.moveTo (size * Math.cos(0), size *  Math.sin(0));
    if (options.sides == "circle") {
      ctx.arc(0, 0, size, 0, 2 * Math.PI);
    } else {
      // ctx.moveTo(size/2 * Math.sin(0), size/2 * Math.cos(0));
      for (var i = 1; i <= sides; i += 1) {
       
        var vertexSize =  size/2 + (Math.abs(audio.domainArray[i] - 128))*2
  
       
    
        var x = Math.round(vertexSize * Math.sin((i * 2 * Math.PI) / sides));
        var y = Math.round(vertexSize * Math.cos((i * 2 * Math.PI) / sides));
  
        if(i===1){
          ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
      }
    }
  
    if (options.outline) {
      // We are making the same polygon but 90% of the size to create an 'outline' from the delta.
      var innerPolygonSize = size * 0.45;
  
      //ctx.moveTo(innerPolygonSize * Math.cos(0), innerPolygonSize * Math.sin(0));
  
      if (options.sides == "circle") {
        ctx.arc(0, 0, innerPolygonSize, 0, 2 * Math.PI);
      } else {
        ctx.moveTo(
          innerPolygonSize * Math.sin(0),
          innerPolygonSize * Math.cos(0)
        );
        for (var i = 1; i <= sides; i += 1) {
          var x = Math.round(
            innerPolygonSize * Math.sin((i * 2 * Math.PI) / sides)
          );
          var y = Math.round(
            innerPolygonSize * Math.cos((i * 2 * Math.PI) / sides)
          );
  
          ctx.lineTo(x, y);
        }
      }
    }
  
    // NOTE: this is SUPER SUPER important for drawing outlines!!
    ctx.clip("evenodd");
  
    if (options.rotation) {
      ctx.rotate(-radians);
    }
    ctx.translate(-centerX, -centerY);
  
    if (!options.orbiting) {
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      ctx.restore();
    }
  
}
