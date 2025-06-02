import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

@Component({
  selector: 'app-snowfall',
  templateUrl: './snowfall.component.html',
  styleUrls: ['./snowfall.component.scss']
})
export class SnowfallComponent implements AfterViewInit {
  @ViewChild('snowfallCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;
  private snowflakes: Snowflake[] = [];
  private animationFrameId: number = 0;

  ngAfterViewInit() {
    this.setupCanvas();
    this.createSnowflakes(200);
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.setupCanvas();
    this.createSnowflakes(200);
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
  }

  private createSnowflakes(count: number) {
    this.snowflakes = [];
    for (let i = 0; i < count; i++) {
      this.snowflakes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5
      });
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'white';
    this.ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    this.ctx.shadowBlur = 5;

    for (const flake of this.snowflakes) {
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.fill();

      flake.y += flake.speed;
      if (flake.y > this.height) {
        flake.y = 0;
        flake.x = Math.random() * this.width;
      }
    }
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
