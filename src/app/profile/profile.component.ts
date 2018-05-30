import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  @Input() student: Student;

  constructor(
    private route: ActivatedRoute,
    private  studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getStudent();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
        .subscribe(student => this.student = student);
  }

}
