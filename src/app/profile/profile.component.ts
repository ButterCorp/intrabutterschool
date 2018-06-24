import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { LikesService } from '../likes.service';
import { Document } from '../document';
import { DocumentService } from '../document.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Likes } from '../likes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  selectedItem = 'publications';
  @Input() student: Student;
  posts: Post[];
  allPosts: Post[];
  documents: Document[];
  likes: Likes[];

  publications = 1; //initialisé le tab sur la vue 

  displayupdate: boolean = false;
  displaydelete: boolean = false;
  displaybio: boolean = false;
  
  
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private postService: PostService,
    private documentService: DocumentService,
    private location: Location,
    private likesService: LikesService
  ) { }

  showDialog(id: string) {
    if(id == 'delete')
      this.displaydelete = true;
    else if (id == 'update')
      this.displayupdate = true;
    else if (id == 'bio')
      this.displaybio = true;
  }

  hideDialog(id: string) {
    if(id == 'delete')
      this.displaydelete = false;
    else if (id == 'update')
      this.displayupdate = false;
    else if (id == 'bio')
      this.displaybio = false;
  }


  ngOnInit() {
    this.getStudent(); //get the actual student from the URL param
    this.getPostsFromStudent(); //get all posts from this student
    this.getDocumentsFromStudent();
    this.getLikes();
    this.getAllPosts();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
        .subscribe(student => this.student = student);
  }

  getLikes(): void {
    this.likesService.getLikes()
        .subscribe(likes => this.likes = likes);
  }

  getPostsFromStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPosts()
        .subscribe(posts => this.posts = posts.filter(posts => posts.id_student === id).reverse());
  }
  getAllPosts(): void {
    this.postService.getPosts()
        .subscribe(posts => this.allPosts = posts.reverse());
        //.subscribe(posts => console.log(posts));
  }

  getDocumentsFromStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.documentService.getDocuments()
        .subscribe(documents => this.documents = documents.filter(documents => documents.id_student === id).reverse());
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

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }

  update(post: Post, content: string): void {
    post.content = content;
    this.postService.updatePost(post).subscribe();
  }

  updateBio(student: Student, content: string): void {
    student.bio = content;
    this.studentService.updateStudent(student).subscribe();
  }

  showNumberOfLike(id: number){
    if(typeof this.likes != "undefined"){
      let result = this.likes.filter(like => like.id_post == id);
      return result.length;
    }
    return 0;
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

  showPostFromId(id: number): String {
    if(typeof this.allPosts != "undefined"){
       var result = this.allPosts.filter(post => post.id == id);
       return result[0]['content'];
   }
 }
 showAuthorFromPostId(id: number) {
  if(typeof this.allPosts != "undefined"){
     var result = this.allPosts.filter(post => post.id == id);
     return result[0]['id_student'];
 }
}

}
