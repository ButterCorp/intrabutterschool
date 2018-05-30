import { Component, OnInit } from '@angular/core';
import { SemanticDropdownDirective } from '../semantic-dropdown.directive';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})

export class MenuNavComponent implements OnInit {

  sidebar = false;

  constructor() { }

  ngOnInit() {
  }

}

