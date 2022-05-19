
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private validateAdminUrl: any;
  constructor(private http: HttpClient) {this.validateAdminUrl = 'http://localhost:8098/validateAdmin/'; }
  public validateAdmin(userName: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(this.validateAdminUrl);
  }
}
