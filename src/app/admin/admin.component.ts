import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Classroom } from '../classroom';
import { ClassroomService } from '../classroom.service';
import { Document } from '../document';
import { DocumentService } from '../document.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedItem = 'class';
  students: Student[];
  posts: Post[];
  student: Student;
  classroom: Classroom;
  documents: Document[];

  constructor(
    private studentService: StudentService, 
    private postService: PostService,
    private classroomService: ClassroomService,
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    this.getClassroom(1);
    this.getStudents();
    this.getPosts();
    this.getDocuments();
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
  getDocuments(): void {
    this.documentService.getDocuments()
        .subscribe(documents => this.documents = documents.reverse());
  }

  getClassroom(id: number): void {
    this.classroomService.getClassroom(id)
        .subscribe(classroom => this.classroom = classroom)
  }
  
  banStudent(student: Student): void {
    student.active = !student.active;
    this.studentService.updateStudent(student)
        .subscribe(student => this.student = student);
  }

  getNbPublications(id: number): number{
    let retour = 0;
    if(typeof this.posts != "undefined"){
      let result = this.posts.filter(post => post.id_student == id);
      retour = result.length;
    }
    return retour;
  }
  getNbFiles(id: number): number{
    let retour = 0;
    if(typeof this.documents != "undefined"){
      let result = this.documents.filter(document => document.id_student == id);
      retour = result.length;
    }
    return retour;
  }

}
