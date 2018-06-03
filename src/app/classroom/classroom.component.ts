import { Component, OnInit } from '@angular/core';
import { Classroom } from '../classroom';
import { ClassroomService } from '../classroom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
