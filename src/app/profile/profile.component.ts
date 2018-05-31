import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  @Input() student: Student;
  posts: Post[];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getStudent(); //get the actual student from the URL param
    this.getPostsFromStudent(); //get all posts from this student
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
        .subscribe(student => this.student = student);
  }

  getPostsFromStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPosts()
        .subscribe(posts => this.posts = posts.filter(posts => posts.id_student === id).reverse());
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

}
