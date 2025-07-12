import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:7119/api/Auth';

  constructor(private http: HttpClient) {}

 login(username: string, password: string): Observable<{
  status: number;
  message: string;
  data: { token: string; role: string };
}> {
  return this.http.post<{ status: number; message: string; data: { token: string; role: string } }>(
    `${this.baseUrl}/login`, { username, password }
  );
}


  signup(userData: { username: string; password: string }) {
  return this.http.post(`${this.baseUrl}/register`, userData);
}

}
