import { Component, OnInit } from '@angular/core';
import { SemanticDropdownDirective } from '../semantic-dropdown.directive';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})

export class MenuNavComponent implements OnInit {

  sidebar = false;

  constructor(
    private location: Location,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}

