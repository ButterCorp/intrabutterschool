import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNavComponent } from './menu-nav.component';

describe('MenuNavComponent', () => {
  let component: MenuNavComponent;
  let fixture: ComponentFixture<MenuNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
