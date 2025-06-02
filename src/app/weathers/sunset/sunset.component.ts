import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sunset',
  templateUrl: './sunset.component.html',
  styleUrls: ['./sunset.component.scss']
})
export class SunsetComponent implements AfterViewInit {
  @ViewChild('sunsetCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private width = window.innerWidth;
  private height = window.innerHeight;

  ngAfterViewInit() {
    this.drawSunset();
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.drawSunset();
  }

  private drawSunset() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;

    const gradient = this.ctx.createLinearGradient(0, this.height, 0, 0);
    gradient.addColorStop(0, '#f3904f'); // orange
    gradient.addColorStop(0.5, '#bc4e9c'); // purple-pink
    gradient.addColorStop(1, '#3b4371'); // night blue

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
