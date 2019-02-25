import { Component } from '@angular/core';
import { HubService } from '@shared/services/hub.service';


@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(
    public hub: HubService
  ) { }
}
