import { Component, OnInit } from '@angular/core';
import { HubService } from '@shared/services/hub.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  playerCount: number;

  constructor(
    public hub: HubService
  ) { }

  ngOnInit() {
    this.hub.players$.subscribe(n => this.playerCount = n);
  }
}
