import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { WeatherEffect } from '../weather.service';

interface Cloud {
  x: number;
  y: number;
  speed: number;
  scale: number;
}

@Component({
  selector: 'app-cloud-canvas',
  templateUrl: './cloud-canvas.component.html',
  styleUrls: ['./cloud-canvas.component.scss']
})
export class CloudCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cloudCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() effect: WeatherEffect = 'cloud'; // Default
  private ctx!: CanvasRenderingContext2D;
  private width = window.innerWidth;
  private height = window.innerHeight;
  private clouds: Cloud[] = [];
  private animationFrameId = 0;

  ngAfterViewInit() {
    this.setupCanvas();
    this.createClouds(10);
    this.animate();
  }

  ngOnChanges() {
    this.setupCanvas();
    this.createClouds(10); // You can tweak this base count
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.setupCanvas();
    this.createClouds(10);
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
  }

private createClouds(count: number) {
  let density = 1;
  let speedMultiplier = 1;

  switch (this.effect) {
    case 'scatteredCloud':
      density = 0.5;
      speedMultiplier = 0.8;
      break;
    case 'brokenCloud':
      density = 1;
      speedMultiplier = 1;
      break;
    case 'OvercastCloud':
      density = 1.5;
      speedMultiplier = 0.5;
      break;
    default: // 'cloud'
      density = 1;
      speedMultiplier = 1;
  }

  const totalClouds = Math.floor(count * density);

  this.clouds = Array.from({ length: totalClouds }, () => ({
    x: Math.random() * this.width,
    y: Math.random() * this.height * 0.5,
    speed: (Math.random() * 0.3 + 0.1) * speedMultiplier,
    scale: Math.random() * 0.5 + 0.5
  }));
}


private drawCloud(cloud: Cloud) {
  const ctx = this.ctx;
  const { x, y, scale } = cloud;

  // Prepare a fill style
  let fillStyle: CanvasGradient | string = 'rgba(255, 255, 255, 0.8)'; // default

  if (this.effect === 'OvercastCloud') {
    // Create a radial gradient for realistic blending of white and light gray
    const gradient = ctx.createRadialGradient(
      x + 40 * scale, y, 10 * scale,     // inner circle
      x + 40 * scale, y, 60 * scale      // outer circle
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.85)');  // white center
    gradient.addColorStop(1, 'rgba(180, 180, 180, 0.7)');   // light gray edge
    fillStyle = gradient;
  } else {
    switch (this.effect) {
      case 'scatteredCloud':
        fillStyle = 'rgba(255, 255, 255, 0.75)';
        break;
      case 'brokenCloud':
        fillStyle = 'rgba(200, 200, 200, 0.7)'; // light gray
        break;
      default: // 'cloud'
        fillStyle = 'rgba(255, 255, 255, 0.8)';
        break;
    }
  }

  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, 30 * scale, 0, Math.PI * 2);
  ctx.arc(x + 40 * scale, y - 10 * scale, 35 * scale, 0, Math.PI * 2);
  ctx.arc(x + 80 * scale, y, 30 * scale, 0, Math.PI * 2);
  ctx.arc(x + 40 * scale, y + 10 * scale, 35 * scale, 0, Math.PI * 2);
  ctx.fill();
}



  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const cloud of this.clouds) {
      this.drawCloud(cloud);
      cloud.x += cloud.speed;

      if (cloud.x - 100 > this.width) {
        cloud.x = -150;
        cloud.y = Math.random() * this.height * 0.5;
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
