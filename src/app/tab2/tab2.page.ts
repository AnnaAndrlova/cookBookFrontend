import { Component } from '@angular/core';
import {ApiService} from '../api.service';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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
  autorid = null;
  constructor(public _apiService: ApiService) {
    this.getRecepty();
  }
  addRecept(){
    const data = {
      nazev: this.nazev,
      popisek: this.popisek,
      postup: this.postup,
      ingredience: this.ingredience,
      hlavniObrazek: this.hlavniObrazek,
      autorid: this.autorid
      //hlavniObrazek: null,
    };
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.addRecept(data).subscribe((res: any) => {
      console.log('SUCCESS ===', res);
      this.nazev = '';
      this.popisek = '';
      this.postup = '';
      this.ingredience= '';
      this.hlavniObrazek= '';
      this.autorid = '';
      alert('SUCCESS');
      this.getRecepty();
    }, (error: any) =>{
      alert('ERROR');

      console.log('ERROR ===', error);
    });
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

