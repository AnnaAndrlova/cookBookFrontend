import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {
  iduserandidrecept: any;
  i = 0;
  name: any;
  idrecept: any;
  obtiznost: any;
  iduser: any;
  heart = false;
  recept: any;
  id: any;
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  obrazky: any;
  hlavniObrazek: any;
  autorid: any;
  showData = 'description';
  prijmeni: any;
  jmeno: any;
  receptyautora: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private _apiService: ApiService,) {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      console.log(this.id);
      this.getRecept(this.id);
      this.isinfavourite();
    });
  }

  ngOnInit() {
  }
  getRecept(id){
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getRecept(id).subscribe((res: any) => {
      console.log('SUCCESS', res);
      const recept = res[0];
      this.nazev = recept.nazev;
      this.popisek = recept.popisek;
      this.postup = recept.postup;
      this.ingredience= recept.ingredience;
      this.obrazky= recept.obrazky;
      this.hlavniObrazek= recept.hlavniObrazek;
      this.autorid = recept.autorid;
      this.obtiznost = recept.obtiznost;
      this.name = recept.name;

      // získám dalsí recepty auora tohoto receptu
      console.log('toto je id autora : ' + this.autorid);
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.getUserRecepty(this.autorid).subscribe(async (ree: any) => {
        console.log('SUCCESS, toto jsou recepty tohoto autora: ', ree);
        this.receptyautora = ree;
      }, (err: any) => {
        console.log('ERROR', err);
      });
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.getUser(this.autorid).subscribe((rev: any) => {
        console.log('SUCCESS', rev);
        const user = rev[0];
        this.jmeno = user.jmeno;
        this.prijmeni = user.prijmeni;
      }, (error: any) => {
        console.log('ERROR', error);
      });
    }, (error: any) =>{
      console.log('ERROR', error);
    });
  }
  segmentChanged(event: any) {
    this.showData = event.detail.value;
  }
  //tato funkce zbarví srdícko, pokud se recept nachází v oblíbených
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
          if(res[this.i].idrecept===this.id){
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

  async addFavouriteRecept() {
    //je stisknuto tlačítko a srdíčko není zbarvené => zbarvi ho a přidej do databáze - vyřeseno
    if (this.heart === false) {
      const {value} = await Storage.get({key: 'id'});
      this.iduser = value;
      this.heart = true;
      this.idrecept = this.id;
      const data = {
        idrecept: this.idrecept,
        iduser: this.iduser,
      };
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.addFavouriteRecept(data).subscribe(async (res: any) => {
        console.log('SUCCESS ===', res);
        this.idrecept = '';
        this.iduser = '';
      }, (error: any) => {
        console.log('ERROR ===', error);
      });
      // pokud je recept již uložen, odstraň ho
    } else {
      this.heart = false;
      this.idrecept = this.id;
      const {value} = await Storage.get({key: 'id'});
      this.iduser = value;
      this.iduserandidrecept = [this.iduser,this.idrecept];
      console.log('Toto je iduser a idrecept', this.iduserandidrecept);
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.deleteFavouriteRecept(this.iduserandidrecept).subscribe((res: any) => {
        console.log('SUCCESS', res);
      }, (err: any) =>{
        console.log('ERROR', err);
      });
    }
  }
}
