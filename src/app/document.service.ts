import { Injectable } from '@angular/core';
import { Document } from './document';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  private documentUrl = 'api/documents';

  constructor(private http: HttpClient) { }

  /** GET documents from the server */
  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.documentUrl).pipe(
      tap(students => console.log(`fetched documents`)),
      catchError(this.handleError('getDocuments', []))
    );
  }

   /** POST: add a new document to the server */
   addDocuments(document: Document): Observable<Document> {
    return this.http.post<Document>(this.documentUrl, document, httpOptions).pipe(
      tap((document: Document) => console.log(`added document w/ id=${document.id}`)),
      catchError(this.handleError<Document>('addDocument'))
    );
  }

  /** DELETE: delete the document from the server */
  deleteDocument(document: Document | number): Observable<Document> {
    const id = typeof document === 'number' ? document : document.id;
    const url = `${this.documentUrl}/${id}`;

    return this.http.delete<Document>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted document id=${id}`)),
      catchError(this.handleError<Document>('deleteDocument'))
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
