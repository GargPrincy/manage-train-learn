import { Component } from '@angular/core';

import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public searchWord: string = '';
  constructor(

    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      const searchKey = params['searchKey'];
      this.searchWord = searchKey;
    });
  }

}
