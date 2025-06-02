import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { WeatherEffect } from '../weather.service';

interface Particle {
  x: number;
  y: number;
  dx: number;
  radius: number;
  speed: number;
  opacity: number;
}

@Component({
  selector: 'app-wind-effect',
  templateUrl: './wind-effect.component.html',
  styleUrls: ['./wind-effect.component.scss']
})
export class WindEffectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('weatherCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() type: WeatherEffect = 'mist';

  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;
  private particles: Particle[] = [];
  private animationFrameId: number = 0;

  ngAfterViewInit() {
    this.setupCanvas();
    this.createParticles(80);
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.setupCanvas();
    this.createParticles(80);
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.globalCompositeOperation = 'source-over';
  }

  private getColor(): string {
    // Strong visibility colors for debug
    switch (this.type) {
      case 'fog': return 'rgba(180, 180, 180, 0.3)';
      case 'haze': return 'rgba(255, 200, 150, 0.3)';
      case 'dust': return 'rgba(200, 180, 100, 0.3)';
      default: return 'rgba(255, 255, 255, 0.3)'; // mist - bright white
    }
  }

  private createParticles(count: number) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        dx: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 100 + 50,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.4 + 0.2
      });
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.getColor();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;

      p.x += p.dx;
      p.y += p.speed;

      if (p.y > this.height) p.y = -p.radius;
      if (p.x > this.width + p.radius) p.x = -p.radius;
      if (p.x < -p.radius) p.x = this.width + p.radius;
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
