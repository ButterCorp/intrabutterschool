import { Component, OnInit } from '@angular/core';
import { Document } from '../document';
import { DocumentService } from '../document.service';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})

export class DocumentsComponent implements OnInit {

  documents: Document[];
  students: Student[];

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private studentService: StudentService,
    private location: Location
  ) { } 

  ngOnInit() {
    this.getDocuments();
    this.getStudents();
  }

  getDocuments(): void {
    this.documentService.getDocuments()
        .subscribe(documents => this.documents = documents.reverse());
  }

  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students)
  }

  showCredentialFromStudent(id: number, credential: string): String {
      if(typeof this.students == "undefined"){ return; }
       var students = this.students;
       var result = students.filter(student => student.id == id);
       return result[0][credential];
 }

}
