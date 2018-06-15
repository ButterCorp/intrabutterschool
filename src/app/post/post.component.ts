import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { StudentService } from '../student.service';
import { LikesService } from '../likes.service';
import { Post } from '../post';
import { Student } from '../student';
import { Likes } from '../likes';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  students: Student[];
  likes: Likes[];

  displayupdate: boolean = false;
  displaydelete: boolean = false;

  constructor(
    private postService: PostService,
    private studentService: StudentService,
    private likesService: LikesService
  ) { }

  showDialog(id: string) {
    if(id == 'delete')
      this.displaydelete = true;
    else if (id == 'update')
      this.displayupdate = true;
  }

  hideDialog(id: string) {
    if(id == 'delete')
      this.displaydelete = false;
    else if (id == 'update')
      this.displayupdate = false;
  }

  ngOnInit() {
    this.getPosts();
    this.getStudents();
    this.getLikes();
  }

  getPosts(): void {
    this.postService.getPosts()
        .subscribe(posts => this.posts = posts.reverse());
        //.subscribe(posts => console.log(posts));
  }
  
  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students)
  }
  getLikes(): void {
    this.likesService.getLikes()
        .subscribe(likes => this.likes = likes);
  }

  add(content: string): void {
    content = content.trim();
    if (!content) { return; }
    var newPost: Post = {
      id: null,
      content: content,
      file: null,
      type: 'à posté un message',
      id_student: 1
    };
    this.postService.addPost(newPost)
      .subscribe(post => {
        this.posts.unshift(post);
      });
  }

  isUserLike(id_post: number){
    var id_student = 1;
    var id_to_delete = 0;
    var retour = "";
    if(typeof this.likes != "undefined"){
      this.likes.forEach(function(entry) {
        if(id_student == entry.id_student && id_post == entry.id_post){
          id_to_delete = entry.id;
        }   
      });
      if(id_to_delete != 0) retour = "active";
      if(id_to_delete == 0) retour = "";

      return retour;
    }
   
  }

  updateLike(id_post: number){
    var id_student = 1;
    var temp = this.likes.filter(like => id_student == like.id_student && id_post == like.id_post);
    var id_to_delete = typeof(temp[0]) != 'undefined' ? temp[0].id : 0;

    //Le post actuel n'a pas de like et du coup il faut ajouter le like
    if(id_to_delete == 0){
      var newLike: Likes = {
        id: null,
        id_post: id_post,
        id_student: id_student
      };
    
    this.likesService.updateLikeService(newLike)
        .subscribe(likes =>{
          this.likes.push(likes);
        });

    } //Le post actuel a un like et dans ce cas là il faut supprimer le like
    else {
      var likes: Likes = {
        id: id_to_delete,
        id_student: 1,
        id_post: id_post
      };
      this.likes = this.likes.filter(likes => likes.id !== id_to_delete);
      this.likesService. removeLikeService(likes).subscribe();
    }
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }

  update(post: Post, content: string): void {
    post.content = content;
    this.postService.updatePost(post).subscribe();
  }

  showCredentialFromStudent(id: number, credential: string): String {
     if(typeof this.students != "undefined"){
        var students = this.students;
        var result = students.filter(student => student.id == id);
        return result[0][credential];
    }
  }

  showNumberOfLike(id: number){
    if(typeof this.likes != "undefined"){
      let result = this.likes.filter(like => like.id_post == id);
      return result.length;
    }
    return 0;
  }
}
