import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment.prod';
import { Observable } from 'rxjs';
import { Answer } from '@core/models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  _httpOptions: any;

  constructor(private _http: HttpClient) {
    this._httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  getChallenge(): Observable<any> {
    return this._http.get(`${environment.api}/games/challenge`);
  }

  getAnswers(): Observable<any> {
    return this._http.get(`${environment.api}/games/answers`);
  }

  addAnswer(answer: Answer): Observable<any> {
    return this._http.post(`${environment.api}/games/answers`, answer, this._httpOptions);
  }
}
