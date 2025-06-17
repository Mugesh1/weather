import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrls: ['./custom-cursor.component.scss']
})
export class CustomCursorComponent implements OnInit {

  private dot!: HTMLElement;
  private outline!: HTMLElement;

  private mouseX = 0;
  private mouseY = 0;
  private outlineX = 0;
  private outlineY = 0;

  private lastMoveTime = 0;
  private isStable = false;

  ngOnInit(): void {
    this.dot = document.querySelector('.cursor-dot')!;
    this.outline = document.querySelector('.cursor-outline')!;
    this.animateOutline();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.dot.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
    this.lastMoveTime = Date.now();
    this.isStable = false;

    // Reset size in case it's already stable
    this.outline.classList.remove('stable');
  }

  private animateOutline(): void {
    const animate = () => {
      const now = Date.now();

      // Smooth follow
      this.outlineX += (this.mouseX - this.outlineX) * 0.1;
      this.outlineY += (this.mouseY - this.outlineY) * 0.1;
      this.outline.style.transform = `translate(${this.outlineX}px, ${this.outlineY}px)`;

      // If cursor hasn't moved in 500ms, consider it stable
      if (!this.isStable && now - this.lastMoveTime > 500) {
        this.outline.classList.add('stable');
        this.outline.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
        this.isStable = true;
      }

      requestAnimationFrame(animate);
    };
    animate();
  }
}