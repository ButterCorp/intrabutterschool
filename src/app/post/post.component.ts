import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { StudentService } from '../student.service';
import { LikesService } from '../likes.service';
import { Post } from '../post';
import { Student } from '../student';
import { Likes } from '../likes';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  students: Student[];
  likes: Likes[];

  constructor(
    private postService: PostService,
    private studentService: StudentService,
    private likesService: LikesService
  ) { }

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

  updateLike(id_post: number){
    var id_student = 1;
    var find = 0;
    var id_to_delete = 0;
    this.likes.forEach(function(entry) {
      if(id_student == entry.id_student && id_post == entry.id_post){
        find = 1;
        id_to_delete = entry.id;
      }
    });
    
    console.log("find ="+find);

    if(find == 0){
      var newLike: Likes = {
      id: null,
      id_post: id_post,
      id_student: id_student
    };
    
    this.likesService.updateLikeService(newLike)
        .subscribe(likes =>{
          this.likes.push(likes);
        });
        // .subscribe(likes => {
        //   this.likes.unshift(likes);
        // });
  } else {
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

  showCredentialFromStudent(id: number, credential: string): String {
     if(typeof this.students != "undefined"){
        var students = this.students;
        var result = students.filter(student => student.id == id);
        return result[0][credential];
    }
  }

  showNumberOfLike(id: number){
    let count = 0;
    if(typeof this.likes != "undefined"){
      this.likes.forEach(function(entry) {
        if(id == entry.id_post){
          count++;
        }
      });
    }
    return count;
  }

}
