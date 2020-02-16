import { Vector } from "../vector";
import { drawPolygon } from "./polygon";

export class Pulsor {
  constructor(id, position, options = {}) {
    this.id = id;
    this.position = position;
    this.growthRate = options.growthRate || 4;
    this.pulsePeriod = options.pulsePeriod || 8;
    this.numPulseThreshold = options.numPulseThreshold || 3;
    this.sizePulseThreshold = options.sizePulseThreshold || 150;
    this.options = options;

    this.growthCount = 0;
    this.pulseCount = 0;
    this.pulses = [];
    this.stopPulsing = false;
    this.pulse();
  }

  pulse() {
    this.pulses.push(new Pulse(0));
    this.pulseCount += 1;
  }

  isDead() {
    return this.stopPulsing && this.pulses.length === 0
  }

  killPulse(index) {
    this.pulses.splice(index, 1);
  }

  timeToRePulse() {
    if (this.pulsePeriod === undefined) { return false; }
    if (this.options.autoRePulse === undefined) { return false; }
    return this.growthCount % this.pulsePeriod === 0
  }

  timeToStopPulsing() {
    if (this.numPulseThreshold === undefined) { return false; }
    return this.pulseCount > this.numPulseThreshold;
  }

  timeToKillPulse(pulse) {
    if (this.sizePulseThreshold === undefined) { return false; }
    return pulse.size > this.sizePulseThreshold;
  }

  grow() {
    this.growthCount += 1;
    for(const [index, pulse] of this.pulses.entries()) {
      pulse.grow(this.growthRate);
      if(this.timeToKillPulse(pulse)) { this.killPulse(index); }
    }

    //if(this.timeToStopPulsing()) { this.stopPulsing = true ; }
    if(this.timeToRePulse() && !this.stopPulsing) { this.pulse(); }
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
