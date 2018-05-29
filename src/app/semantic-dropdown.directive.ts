import { Directive, ElementRef } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[sm-dropdown]'
})
export class SemanticDropdownDirective {

  constructor(el: ElementRef) { 
    jQuery(el.nativeElement).dropdown();
  }

}
