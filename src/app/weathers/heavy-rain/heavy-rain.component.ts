import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  wind: number;
}



@Component({
  selector: 'app-heavy-rain',
  templateUrl: './heavy-rain.component.html',
  styleUrls: ['./heavy-rain.component.scss']
})
export class HeavyRainComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rainCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width = window.innerWidth;
  private height = window.innerHeight;
  private raindrops: Raindrop[] = [];
  private animationFrameId = 0;
  private flashOpacity = 0;
  private thunderTimer = 0;
  private lightningBolts: { points: { x: number; y: number }[]; opacity: number }[] = [];

  ngAfterViewInit() {
    this.setupCanvas();
    this.createRaindrops(300); // More drops for heavy rain
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.setupCanvas();
    this.createRaindrops(300);
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
      length: Math.random() * 25 + 15,
      speed: Math.random() * 6 + 6,
      wind: Math.random() * 2 + 2 // Wind drift
    }));
  }

  private animate = () => {
    // 1. Clear canvas first
    this.ctx.clearRect(0, 0, this.width, this.height);
  
    // 2. Draw raindrops
    this.ctx.strokeStyle = 'rgba(174,194,224,0.7)';
    this.ctx.lineWidth = 1.2;
  
    for (const drop of this.raindrops) {
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x + drop.wind, drop.y + drop.length);
      this.ctx.stroke();
  
      drop.x += drop.wind;
      drop.y += drop.speed;
  
      if (drop.y > this.height || drop.x > this.width) {
        drop.y = 0;
        drop.x = Math.random() * this.width;
      }
    }
  
    // 3. Draw lightning bolt if exists, else draw flash overlay
    if (this.lightningBolts) {
     for (let i = this.lightningBolts.length - 1; i >= 0; i--) {
    const bolt = this.lightningBolts[i];
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.opacity})`;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
    for (let j = 1; j < bolt.points.length; j++) {
      this.ctx.lineTo(bolt.points[j].x, bolt.points[j].y);
    }
    this.ctx.stroke();

    bolt.opacity -= 0.03;
    if (bolt.opacity <= 0) {
      this.lightningBolts.splice(i, 1); // remove faded bolt
    }
  }
    } else if (this.flashOpacity > 0) {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.flashOpacity})`;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.flashOpacity -= 0.02;
    }
  
    // 4. Randomly trigger thunder/lightning
    this.thunderTimer++;
    if (this.thunderTimer > 300 && Math.random() > 0.98) {
      this.flashOpacity = 0.6 + Math.random() * 0.3;
      this.createLightningBolts();   // <-- call your bolt generator here
      this.triggerBodyFlash();
      this.thunderTimer = 0;
    }
  
    // 5. Continue animation loop
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private createLightningBolts() {
    this.lightningBolts = [];  // reset bolts
  
    const boltCount = 2 + Math.floor(Math.random() * 2); // 2 or 3 bolts
  
    for (let b = 0; b < boltCount; b++) {
      const startX = Math.random() * this.width;
      const startY = 0;
      const points = [{ x: startX, y: startY }];
  
      let currentX = startX;
      let currentY = startY;
      const segmentCount = 5 + Math.floor(Math.random() * 15); // varying length
  
      for (let i = 0; i < segmentCount; i++) {
        currentX += (Math.random() - 0.5) * 30;
        currentY += this.height / segmentCount;
        points.push({ x: currentX, y: currentY });
      }
  
      this.lightningBolts.push({ points, opacity: 1 });
    }
  }
  
  

  private triggerBodyFlash() {
    document.body.classList.add('flash');
    setTimeout(() => document.body.classList.remove('flash'), 150);
  }
  

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}

