import { Directive, ElementRef, HostListener } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[sm-modal-small]'
})
export class SemanticModalSmallDirective {

  constructor( private el: ElementRef ) { }

  @HostListener('mouseup') onMouseUp() {
    jQuery('.ui.small.modal').modal('show');
  }

}
