import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[sm-sticky]'
})
export class SemanticStickyDirective {

  constructor(private el: ElementRef) { 
    console.log(this.el);
    jQuery('.ui.sticky')
    .sticky({
      context: 'stikcy-wrapper'
    })
  ;
  }

}
