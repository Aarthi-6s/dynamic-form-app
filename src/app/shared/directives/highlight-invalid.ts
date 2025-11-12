import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightInvalid]',
  standalone: true
})
export class HighlightInvalidDirective implements OnChanges {
  @Input() appHighlightInvalid: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.appHighlightInvalid) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
      this.renderer.setStyle(this.el.nativeElement, 'background', '#ffe6e6');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
      this.renderer.removeStyle(this.el.nativeElement, 'background');
    }
  }
}
