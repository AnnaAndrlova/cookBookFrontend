import { Component } from '@angular/core';
import {ApiService} from '../api.service';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  hlavniObrazek: any;
  recepty: any = [];
  autorid: any;
  constructor(public _apiService: ApiService) {
  }
  async addRecept() {
    const {value} = await Storage.get({key: 'id'});
    this.autorid = value;
    const data = {
      nazev: this.nazev,
      popisek: this.popisek,
      postup: this.postup,
      ingredience: this.ingredience,
      hlavniObrazek: this.hlavniObrazek,
      autorid: this.autorid,

      //hlavniObrazek: null,
    };
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.addRecept(data).subscribe(async (res: any) => {
      console.log('SUCCESS ===', res);
      this.nazev = '';
      this.popisek = '';
      this.postup = '';
      this.ingredience = '';
      this.hlavniObrazek = '';
      this.autorid = '';
      alert('SUCCESS');
    }, (error: any) => {
      alert('ERROR');

      console.log('ERROR ===', error);
    });
  }

}

