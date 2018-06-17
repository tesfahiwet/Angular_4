import {Injectable} from "@angular/core";
 import {Http, Response} from "@angular/http";
 import {Observable} from "rxjs/Observable";
 import "rxjs/Rx";
 import {IPosts} from "./IPosts";
import { IUser } from "./IUser";

@Injectable()
export class DataService {

  private _userUrl = "http://jsonplaceholder.typicode.com/users/1";
  private _postsUrl = "http://jsonplaceholder.typicode.com/posts?userId=1";

  constructor(private http: Http) { }

  getUser(): Observable<IUser>{
    return this.http
      .get(this._userUrl)
      .map((response: Response) => {
        return <IUser> response.json();
      })
      .catch(this.handleError);
  }

  getPosts(): Observable<IPosts[]>{
    return this.http
      .get(this._postsUrl)
      .map((response: Response) => {
        return <IPosts[]> response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response){
    return Observable.throw(error.statusText);
  }

}
