import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { StudentService } from '../student.service';
import { Post } from '../post';
import { Student } from '../student';

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

   showStudentName(id: number): String {
    let name;
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

  showStudentAvatar(id: number): String {
    let avatar;
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

  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students)
  }

  add(content: string): void {
    content = content.trim();
    if (!content) { return; }
    var newPost: Post = {
      id: null,
      content: content,
      file: null,
      type: 'à posté',
      id_student: 1
  };
    this.postService.addPost(newPost)
      .subscribe(post => {
        this.posts.push(post);
      });
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }

}
