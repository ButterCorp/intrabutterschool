import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl = "api/posts";

  constructor(private http: HttpClient) { }

  /** GET posts from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl).pipe(
      tap(students => console.log(`fetched posts`)),
      catchError(this.handleError('getPosts', []))
    );
  }

  /** POST: add a new post to the server */
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postUrl, post, httpOptions).pipe(
      tap((post: Post) => console.log(`added post w/ id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  /** DELETE: delete the post from the server */
  deletePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postUrl}/${id}`;

    return this.http.delete<Post>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  /** PUT: update the post on the server */
  updatePost(post: Post): Observable<any> {
    return this.http.put(this.postUrl, post, httpOptions).pipe(
      tap(_ => console.log(`updated post id=${post.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
