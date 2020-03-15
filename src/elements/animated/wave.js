let p1 = 0.5
let p2 = 0.5
let p3 = 0.6
let p4 = 0.7



export function wave1(ctx, img, audio){

    drawWave(ctx, img, audio, p2)
}

// export function wave2(ctx, img, audio){

//     drawWave(ctx, img, audio, p2)
// }

// export function wave3(ctx, img, audio){

//     drawWave(ctx, img, audio, p3)
// }

// export function wave4(ctx, img, audio){

//     drawWave(ctx, img, audio, p4)
// }


function drawWave(ctx, img, audio, p){
    ctx.save();

    let height = ctx.canvas.height * p
    let remainderHeight = ctx.canvas.height - height 
    
    ctx.translate(0, height);
    ctx.beginPath();
    // ctx.lineTo(x, audio.domainArray[x%256]);
    let count = 0 
    for(let x =0; x<ctx.canvas.width+10; x=x+20){
        ctx.lineTo(x,  3*(audio.domainArray[count]-128));
        count++
    }

    ctx.lineTo(ctx.canvas.width, remainderHeight);
    ctx.lineTo(0,  remainderHeight);
    
    ctx.lineTo(0,  0);
    ctx.translate(0, -height);
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

};


