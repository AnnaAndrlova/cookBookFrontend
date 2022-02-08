import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pocetreceptu: any;
  oblibenerecepty: any;
  idrecept: any;
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  obrazky: any;
  hlavniObrazek: any;
  recepty: any = [];
  autorid = null;
  iduser: any;
  i = 0;
  polereceptu: any = [];
  empty = false;

  constructor(public _apiService: ApiService) {
    this.getFavouriteRecepty();
  }

  async getFavouriteRecepty() {
    //získám id uživatele, které pak použiju na získáni id obl.receptů s ním spojených
    const {value} = await Storage.get({key: 'id'});
    this.iduser = value;
    //získám id receptů
    // získám si id receptu podle id prislusneho uzivatele
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getFavouriteReceptId(this.iduser).subscribe((res: any) => {
      console.log('SUCCESS ===', res);
      // a uložím do proměnné res a následně do recepty
      this.recepty = res;
      if(this.recepty.length === 0){
        console.log('nic tu neni');
        this.empty = true;
      }
      else{
        this.empty = false;
        this.pocetreceptu = this.recepty.length;
        for (this.i = 0; this.i < this.pocetreceptu; this.i++) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          this.polereceptu.push(this.recepty[this.i].idrecept);
        }
        console.log('pole ',this.polereceptu);
        // proměnnou poslu do getFavouriteRecept
        // eslint-disable-next-line no-underscore-dangle
        this._apiService.getFavouriteRecept(this.polereceptu).subscribe((ree: any) => {
          console.log('SUCCESS ===', ree);
          this.oblibenerecepty = ree;
        }, (error: any) => {
          console.log('ERROR ===', error);
        });
      }
    }, (error: any) => {
      console.log('ERROR ===', error);
    });
  }
}
