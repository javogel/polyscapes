import { Vector } from "../vector";
import { drawPolygon } from "./polygon";

export class Pulsor {
  constructor(id, position, options = {}) {
    this.id = id;
    this.position = position;
    this.growthRate = options.growthRate || 4;
    this.pulsePeriod = options.pulsePeriod || 32;
    this.numPulseThreshold = options.numPulseThreshold || 10;
    this.sizePulseThreshold = options.sizePulseThreshold || 150;
    this.pulses = [new Pulse(0)];
    this.stopPulsing = false;
  }

  pulse() {
    if(this.stopPulsing) { return; }
    this.pulses.push(new Pulse(0));
  }

  isDead() {
    return this.stopPulsing && this.pulses.length === 0
  }

  killPulse(index) {
    this.pulses.splice(index, 1);
  }

  grow() {
    for(const [index, pulse] of this.pulses.entries()) {
      pulse.grow(this.growthRate);

      if (pulse.size % this.pulsePeriod === 0) { this.pulse(); }
      if (this.pulses.length > this.numPulseThreshold) { this.stopPulsing = true; }
      if (pulse.size > this.sizePulseThreshold) { this.killPulse(index); }
    }
  }

  drawPulses(ctx, img, audio) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.beginPath();
    for(var pulse of this.pulses) {
      pulse.draw(ctx, img, audio, this.growthRate);
    }
    ctx.clip('evenodd');
    ctx.translate(-this.position.x, -this.position.y);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
    ctx.restore();
    this.grow();
  }
}

class Pulse {
  constructor(size) {
    this.size = size;
  }

  grow(delta) {
    this.size += delta;
  }

  draw(ctx, img, audio, growthRate) {
    let differential = Math.min(this.size * 0.05, growthRate);

    ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
    ctx.arc(0, 0, this.size - differential, 0, 2 * Math.PI);
  }
}
