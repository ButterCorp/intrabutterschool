import { Directive, ElementRef, HostListener } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[sm-sidebar]'
})
export class SemanticSidebarDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseup') onMouseUp() {
    jQuery('.ui.labeled.icon.sidebar')
    .sidebar('toggle');
    console.log(this.el);
  }

}
