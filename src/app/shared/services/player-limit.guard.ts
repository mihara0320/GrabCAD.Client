import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { HubService } from './hub.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerLimitGuard implements CanLoad {
  constructor(private hub: HubService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {
    return this.hub.players$.pipe(
      take(1),
      map(n => n <= 10), // <--- map to boolean
      map(ok => {
        if (!ok) {
          console.log('up to 10 players allowed');
          this.router.navigate(['menu']);
          return false;
        }
        return true;
      })
    );
  }
}
