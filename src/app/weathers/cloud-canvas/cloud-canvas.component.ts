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

interface Bird {
  x: number;
  y: number;
  speed: number;
  frame: number;
  frameTimer: number;
  frameInterval: number;
}

interface Plane {
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
  @Input() effect: WeatherEffect = 'cloud';

  private ctx!: CanvasRenderingContext2D;
  private width = window.innerWidth;
  private height = window.innerHeight;

  private clouds: Cloud[] = [];
  private birds: Bird[] = [];
  private planes: Plane[] = [];
  private animationFrameId = 0;
  private lastTime = 0;

  private birdImage = new Image();
  private planeImage = new Image();
  private imagesLoaded = false;

  private birdFrameWidth = 185 / 3;
  private birdFrameHeight = 148 / 3;
  private totalBirdFrames = 9;

  ngAfterViewInit() {
    Promise.all([
      this.loadImage(this.birdImage, 'assets/bird-sprite.png'),
      this.loadImage(this.planeImage, 'assets/plane.png'),
    ]).then(() => {
      this.imagesLoaded = true;
      this.setupCanvas();
      this.createClouds(10);
      this.animate();
    }).catch(err => {
      console.error('Error loading images:', err);
      this.setupCanvas();
      this.createClouds(10);
      this.animate();
    });
  }

  ngOnChanges() {
    if (this.imagesLoaded) {
      this.setupCanvas();
      this.createClouds(10);
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.setupCanvas();
    this.createClouds(10);
  }

  private loadImage(img: HTMLImageElement, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject(`Failed to load image: ${src}`);
    });
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
      default:
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

    if (this.effect === 'OvercastCloud') {
      this.createBirds(5);
      this.planes = [];
    } else if (this.effect === 'scatteredCloud' || this.effect === 'brokenCloud') {
      this.createPlanes(3);
      this.birds = [];
    } else {
      this.birds = [];
      this.planes = [];
    }
  }

  private createBirds(count: number) {
    const frameInterval = 100;

    this.birds = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height * 0.4,
      speed: 1 + Math.random() * 1,
      frame: 0,
      frameTimer: 0,
      frameInterval
    }));
  }

  private createPlanes(count: number) {
    this.planes = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height * 0.3 + this.height * 0.1,
      speed: 2 + Math.random() * 2,
      scale: 0.5 + Math.random() * 0.5
    }));
  }

  private drawCloud(cloud: Cloud) {
    const ctx = this.ctx;
    const { x, y, scale } = cloud;

    let fillStyle: CanvasGradient | string = 'rgba(255, 255, 255, 0.8)';

    if (this.effect === 'OvercastCloud') {
      const gradient = ctx.createRadialGradient(
        x + 40 * scale, y, 10 * scale,
        x + 40 * scale, y, 60 * scale
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      gradient.addColorStop(1, 'rgba(180, 180, 180, 0.7)');
      fillStyle = gradient;
    } else {
      switch (this.effect) {
        case 'scatteredCloud':
          fillStyle = 'rgba(255, 255, 255, 0.75)';
          break;
        case 'brokenCloud':
          fillStyle = 'rgba(200, 200, 200, 0.7)';
          break;
        default:
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

  private drawBird(bird: Bird, deltaTime: number) {
    if (!this.imagesLoaded) return;

    bird.frameTimer += deltaTime;
    if (bird.frameTimer > bird.frameInterval) {
      bird.frame = (bird.frame + 1) % this.totalBirdFrames;
      bird.frameTimer = 0;
    }

    const frameX = (bird.frame % 3) * this.birdFrameWidth;
    const frameY = Math.floor(bird.frame / 3) * this.birdFrameHeight;

    const ctx = this.ctx;
    const { x, y } = bird;

    ctx.drawImage(
      this.birdImage,
      frameX,
      frameY,
      this.birdFrameWidth,
      this.birdFrameHeight,
      x - this.birdFrameWidth / 2,
      y - this.birdFrameHeight / 2,
      this.birdFrameWidth,
      this.birdFrameHeight
    );
  }

  private drawPlane(plane: Plane) {
    if (!this.imagesLoaded) return;

    const ctx = this.ctx;
    const { x, y, scale } = plane;
    const img = this.planeImage;
    const width = 100 * scale;
    const height = 50 * scale;

    ctx.drawImage(img, x - width / 2, y - height / 2, width, height);
  }

  private animate = (time = 0) => {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const cloud of this.clouds) {
      this.drawCloud(cloud);
      cloud.x += cloud.speed;

      if (cloud.x - 100 > this.width) {
        cloud.x = -150;
        cloud.y = Math.random() * this.height * 0.5;
      }
    }

    for (const bird of this.birds) {
      this.drawBird(bird, deltaTime);
      bird.x += bird.speed;

      if (bird.x > this.width + 20) {
        bird.x = -20;
        bird.y = Math.random() * this.height * 0.4;
      }
    }

    for (const plane of this.planes) {
      this.drawPlane(plane);
      plane.x += plane.speed;

      if (plane.x > this.width + 30) {
        plane.x = -30;
        plane.y = Math.random() * this.height * 0.3 + this.height * 0.1;
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
