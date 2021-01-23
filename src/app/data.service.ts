import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  gateWayAPIUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  getPosts(id?): Observable<any> {
    if (!id) {
      return this.http.get<any>(this.gateWayAPIUrl);
    } else {
      return this.http.get<any>(this.gateWayAPIUrl + "/" + id);
    }
  }

  updatePost(req): Observable<any> {
    const reqBody = JSON.stringify(req);
    return this.http.put<any>(this.gateWayAPIUrl + '/' + req.id, reqBody);
  }
  createPost(req): Observable<any> {
    const reqBody = JSON.stringify(req);
    return this.http.post<any>(this.gateWayAPIUrl, reqBody);
  }
}
