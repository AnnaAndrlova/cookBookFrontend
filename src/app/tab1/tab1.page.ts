import { Component } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@capacitor/storage';


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
  autorid = null;
  iduser: any;
  heart = false;
  i = 0;
  id: any;



  constructor( public _apiService: ApiService,private route: ActivatedRoute,
               private router: Router) {
    this.getRecepty();
    this.isinfavourite();
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
  async isinfavourite() {
    // získám id uživatele
    const {value} = await Storage.get({key: 'id'});
    this.iduser = value;
    // najdu vsechny id receptu s timto uzivatelem spojeny
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getFavouriteReceptId(this.iduser).subscribe(async (res: any) => {
      console.log('SUCCESS ===', res);
      // projdi jedno id po druhém  a podívej se, jestli se alespon s jedním shoduje
      if(res.length!==0){
        while(this.i<res.length){
          // pokud se idreceptu shoduje se id aktualniho recpetu, pak:TODO jak zjistit id aktualniho rceptu,
          //  cim nahradit this.recepty.id protoze to nefungujeeee
          if(res[this.i].idrecept===this.recepty.id){
            this.heart = true;
          }
          this.i++;
        }
      }
      else{
        this.heart = false;
      }
    }, (error: any) => {
      console.log('ERROR ===', error);
    });
  }

}
