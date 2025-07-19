import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from 'src/app/models/contact.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Update this to your real backend API URL
  private baseUrl = `${environment.apiUrl}/Contacts`;
  //private baseUrl = 'https://localhost:7119/api/Contacts';

  constructor(private http: HttpClient) {}

  // Get all contacts
  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get contact by ID
  // getById(id: string): Observable<Contact> {
  //   return this.http.get<Contact>(`${this.baseUrl}/${id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  getById(id: string): Observable<Contact> {
    const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }


  // Create a new contact
  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, contact).pipe(
      catchError(this.handleError)
    );
  }

  // Update existing contact
  // update(id: string, contact: Contact): Observable<Contact> {
  //   return this.http.put<Contact>(`${this.baseUrl}/${id}`, contact).pipe(
  //     catchError(this.handleError)
  //   );
  // }
  update(id: string, contact: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, contact);
}


  // Delete contact by ID
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Centralized error handler
  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    let message = 'Something went wrong!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      message = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      message = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(message));
  }
}
