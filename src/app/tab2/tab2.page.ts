import { Component } from '@angular/core';
import {ApiService} from "../api.service";

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

  constructor(public _apiService: ApiService) {
    this.getRecepty();
  }
  addRecept(){
    let data = {
      nazev: this.nazev,
      popisek: this.popisek,
      postup: this.postup,
      ingredience: this.ingredience,
      hlavniObrazek: this.hlavniObrazek,
      //hlavniObrazek: null,
    }
    this._apiService.addRecept(data).subscribe((res:any) => {
      console.log("SUCCESS ===", res);
      this.nazev = '';
      this.popisek = '';
      this.postup = '';
      this.ingredience= '';
      this.hlavniObrazek= '';
      alert('SUCCESS');
      this.getRecepty();
    }, (error:any) =>{
      alert('ERROR');

      console.log("ERROR ===", error);
    })
  }
  getRecepty(){
    this._apiService.getRecepty().subscribe((res:any) => {
      console.log("SUCCESS ===", res);
      this.recepty = res;
    }, (error:any) =>{
      console.log("ERROR ===", error);
    })
  }

}

