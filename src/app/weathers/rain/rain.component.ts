import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
}

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss']
})
export class RainComponent implements AfterViewInit {
  @ViewChild('rainCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width = window.innerWidth;
  private height = window.innerHeight;
  private raindrops: Raindrop[] = [];
  private animationFrameId = 0;

  ngAfterViewInit() {
    this.setupCanvas();
    this.createRaindrops(150);
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.setupCanvas();
    this.createRaindrops(150);
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
  }

  private createRaindrops(count: number) {
    this.raindrops = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 4
    }));
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    this.ctx.lineWidth = 1;

    for (const drop of this.raindrops) {
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x, drop.y + drop.length);
      this.ctx.stroke();

      drop.y += drop.speed;
      if (drop.y > this.height) {
        drop.y = 0;
        drop.x = Math.random() * this.width;
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
