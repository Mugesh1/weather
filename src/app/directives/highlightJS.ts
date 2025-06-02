import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import hljs from 'highlight.js';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.querySelectorAll('pre code')
      .forEach((block: HTMLElement) => hljs.highlightElement(block));
  }
}
