import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching =false;
  error =null;

  constructor(private http: HttpClient, private postService:PostService) {}

  ngOnInit() {
    this.isFetching= true;
    this.postService.fetchPosts().subscribe(posts=>{
      this.isFetching=false;
      this.loadedPosts=posts;
    },error=>{
      this.error=error.message;
    });
  }

  onCreatePost(postData: Post) {
    this.postService.onCreatePosts(postData.title, postData.content);
 
   }

  onFetchPosts() {
    this.isFetching= true;
    this.postService.fetchPosts().subscribe(posts=>{
      this.isFetching=false;
      this.loadedPosts=posts;
    }, error=>{
      this.error=error.message;
    });
   
  }

  onClearPosts() {
    // Send Http request()
    this.postService.deletePost().subscribe(()=>{
    this.loadedPosts=[];
    });
  }
}
