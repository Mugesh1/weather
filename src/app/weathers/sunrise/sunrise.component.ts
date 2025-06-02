import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sunrise',
  templateUrl: './sunrise.component.html',
  styleUrls: ['./sunrise.component.scss']
})
export class SunriseComponent implements AfterViewInit {
  @ViewChild('sunriseCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width = window.innerWidth;
  private height = window.innerHeight;

  ngAfterViewInit() {
    this.drawSunrise();
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.drawSunrise();
  }

  private drawSunrise() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;

    const gradient = this.ctx.createLinearGradient(0, this.height, 0, 0);
    gradient.addColorStop(0, '#ffcf71');  // yellow-orange
    gradient.addColorStop(0.5, '#fdc830'); // sunrise middle
    gradient.addColorStop(1, '#e96443');  // pink/red top

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
