import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyValuePair } from '@core/models/keyValuePair.model';

import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {
  @Input() scores: Observable<KeyValuePair[]>;

  displayedColumns: string[] = ['key', 'value'];
  dataSource: MatTableDataSource<KeyValuePair>;

  constructor() { }

  ngOnInit() {
    this.scores.subscribe(scores => this.dataSource = new MatTableDataSource(scores));
  }

}
