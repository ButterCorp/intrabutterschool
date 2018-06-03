import { Injectable } from '@angular/core';
import { Classroom } from './classroom';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private classroomUrl = 'api/classroom';

  constructor(private http: HttpClient) { }

  /** GET classrooms from the server */
  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.classroomUrl).pipe(
      tap(students => console.log(`fetched classrooms`)),
      catchError(this.handleError('getClassroom', []))
    );
  }

    /** GET classroom from the server */
    getClassroom(id: number): Observable<Classroom> {
      const url = `${this.classroomUrl}/${id}`;
      return this.http.get<Classroom>(url).pipe(
        tap(_ => console.log(`fetched classroom id=${id}`)),
        catchError(this.handleError<Classroom>(`getClassroom id=${id}`))
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
