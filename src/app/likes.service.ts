import { Injectable } from '@angular/core';
import { Post } from './post';
import { Likes } from './likes';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LikesService {

  private likesUrl = "api/likes";

  constructor(private http: HttpClient) { }

  getLikes(): Observable<Likes[]> {
    return this.http.get<Likes[]>(this.likesUrl).pipe(
      tap(likes => console.log(`fetched likes`)),
      catchError(this.handleError('getLikes', []))
    );
  }

  /** POST: add a new like to the server */
  updateLikeService(likes: Likes): Observable<Likes> {
    return this.http.post<Likes>(this.likesUrl, likes, httpOptions).pipe(
      tap((likes: Likes) => console.log(likes)),
      catchError(this.handleError<Likes>('addLikes'))
    );
  }
   /** DELETE: delete the post from the server */
   removeLikeService(like: Likes | number): Observable<Likes> {
    const id = typeof like === 'number' ? like : like.id;
    const url = `${this.likesUrl}/${id}`;

    return this.http.delete<Likes>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Likes>('deletePost'))
    );
  }
  /** POST: add a new hero to the server */
// addHero (hero: Hero): Observable<Hero> {
//   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
//     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
//     catchError(this.handleError<Hero>('addHero'))
//   );
// }


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
