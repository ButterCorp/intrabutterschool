import { Component, OnInit, Directive, ElementRef } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})

@Directive({
  selector: "[sm-dropdown]",
})

export class MenuNavComponent implements OnInit {

  sidebar = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    jQuery(this.el.nativeElement).dropdown();
  }

}

