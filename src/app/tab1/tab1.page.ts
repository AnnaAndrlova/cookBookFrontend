import { Component } from '@angular/core';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  obrazky: any;
  hlavniObrazek: any;
  recepty: any = [];


  constructor( public _apiService: ApiService) {
    this.getRecepty();
  }


  getRecepty(){
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getRecepty().subscribe((res: any) => {
      console.log('SUCCESS ===', res);
      this.recepty = res;
    }, (error: any) =>{
      console.log('ERROR ===', error);
    });
  }

}
