import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class PostService{
    constructor(private http: HttpClient){}
    onCreatePosts(title: string, content: string){
        const postData:Post={title: title, content: content};
        this.http.post(
            'https://sid-angular.firebaseio.com/posts.json',
             postData,{
               observe:'response'
             })
             .subscribe(responseData=>{
               console.log(responseData);
             });
    }

    fetchPosts(){
       return this.http.get<{[key: string] : Post}>('https://sid-angular.firebaseio.com/posts.json')
        .pipe(
          map(data=>{
            const postsArray= [];
            for( const key in data){
              if(data.hasOwnProperty(key)){
                postsArray.push({ ...data[key], id:key })
              }
            }
            return postsArray;
          }));
      }

      deletePost(){
       return this.http.delete('https://sid-angular.firebaseio.com/posts.json');
      }

    }