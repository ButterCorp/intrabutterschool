import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  students: Student[];

  constructor(
    private postService: PostService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getPosts();
    this.getStudents();
  }

  getPosts(): void {
    this.postService.getPosts()
        .subscribe(posts => this.posts = posts);
  }
  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students);
  }
  getCredentialsFromPosts(posts: Post[], students: Student[]): void {
   // filter(students => students.id == posts[0].id_student);
  } 

  public showStudentName(id: number): String{
    
    //Name par défaut
    let name = "John Doe";
    //Si le tableau d'objet students n'est pas undefined, en gros si la fonction getStudents a bien été appeler avant
    if(typeof this.students != "undefined"){
      //Pour chaque etudiant
      this.students.forEach(function(entry) {
        //Si l'id passé en paramètre correspond à l'id de l'étudiant
        if(id == entry.id){
          //Alors on retourne le nom de l'étudiant
          name = entry.name;
        }
       });
    }
    return name;
  }

  public showStudentAvatar(id: number): String{

    let avatar = "https://semantic-ui.com/images/avatar/small/joe.jpg";
    //Si le tableau d'objet students n'est pas undefined, en gros si la fonction getStudents a bien été appeler avant
    if(typeof this.students != "undefined"){
      //Pour chaque etudiant
      this.students.forEach(function(entry) {
        //Si l'id passé en paramètre correspond à l'id de l'étudiant
        if(id == entry.id){
          //Alors on retourne le nom de l'étudiant
          avatar = entry.avatar;
        }
       });
    }
    return avatar;
  }

}
