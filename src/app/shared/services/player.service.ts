import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment.prod';
import { Observable } from 'rxjs';
import { Player } from '@core/models/player.model';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  _httpOptions: any;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this._httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  // getScores(): Observable<any> {
  //   return this._http.get(`${environment.api}/players`);
  // }

  addPlayer(player: Player): Observable<any> {
    return this._http.post(`${environment.api}/players/add`, player, this._httpOptions).pipe(
      catchError(e => this._router.navigate['menu'])
    );
  }

  removePlayer(player: Player): Observable<any> {
    return this._http.post(`${environment.api}/players/remove`, player, this._httpOptions).pipe(
      catchError(e => this._router.navigate['menu'])
    );
  }
}
