import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSeachField } from 'src/app/reducers/search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  message: string = ''

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.store.dispatch(setSeachField(event?.target?.value))
  }

}
