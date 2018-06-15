import { Directive, ElementRef, HostListener } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[sm-modal-basic]'
})
export class SemanticModalBasicDirective {

  constructor( private el: ElementRef ) { }

  @HostListener('mouseup') onMouseUp() {
    jQuery('.ui.basic.modal').remove();
    jQuery('.ui.basic.modal').modal('show');
    console.log('cloooose')
  }

}