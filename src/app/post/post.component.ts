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

  getStudents(): void {
    this.studentService.getStudents()
        .subscribe(students => this.students = students)
  }

  add(content: string): void {
    content = content.trim();
    if (!content) { return; }
    this.postService.addPost({ content } as Post)
      .subscribe(post => {
        this.posts.push(post);
      });
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(h => h !== post);
    this.postService.deletePost(post).subscribe();
  }

}
