export function centeredCircle(ctx, img) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(188, 150);
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 300, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.clip();
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

export function horizontalStripes(ctx, img) {
  const strips = 12;
    for (let i = 1; i <= strips; i = i + 3) {
      ctx.drawImage(
        img,
        0,
        i * img.height/strips,
        img.width,
        img.height/strips,
        0,
        i * ctx.canvas.height/strips,
        ctx.canvas.width,
        ctx.canvas.height/strips
      );
    }
}

export function verticalStripes(ctx, img) {
//   const strips = Math.floor(audio.domainArray[0]/10);
    const strip = 10

  for (let i = 1; i <= strips; i = i + 3) {
    ctx.drawImage(
      img,
      i * img.width/strips,
      0,
      img.width/strips,
      img.height,
      i * ctx.canvas.width/strips,
      0,
      ctx.canvas.width/strips,
      ctx.canvas.height
    );
  }


}


export function triangle(ctx, img) {
    const side = 700
    const cx = ctx.canvas.width/2
    const cy = ctx.canvas.height/2 - 50
    const h = side * (Math.sqrt(3)/2);
  
    ctx.save();
    ctx.strokeStyle = "rgba(1, 1, 1, 0)";
    ctx.translate(cx, cy);
  
    ctx.beginPath();
  
      ctx.moveTo(0, -h / 2);
      ctx.lineTo( -side / 2, h / 2);
      ctx.lineTo(side / 2, h / 2);
      ctx.lineTo(0, -h / 2);
      ctx.stroke();
  
    ctx.clip();
    ctx.translate(-cx, -cy);
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


export function backgroundImage(ctx, img) {
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
}
