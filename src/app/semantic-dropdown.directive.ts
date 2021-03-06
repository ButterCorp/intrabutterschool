import { Directive, ElementRef, HostListener } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[sm-dropdown]'
})
export class SemanticDropdownDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseup') onMouseUp() {
    jQuery(this.el.nativeElement).dropdown();
  }

}
