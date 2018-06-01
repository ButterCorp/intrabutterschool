import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedItem = 'classroom';
  students: Student[];
  posts: Post[];
  student: Student;

  constructor(
    private studentService: StudentService, 
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getStudents();
    this.getPosts();
  }

  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students);
  }

  getStudent(id: number): void {
    this.studentService.getStudent(id)
        .subscribe(student => this.student = student);
  }

  getPosts(): void {
    this.postService.getPosts()
        .subscribe(posts => this.posts = posts.reverse());
  }

  banStudent(student: Student): void {
    student.active = !student.active;
    this.studentService.updateStudent(student);
  }

}
