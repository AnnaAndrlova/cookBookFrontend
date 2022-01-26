import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IdServiceService} from '../id-service.service';
import {Storage} from '@capacitor/storage';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  id: any;
  autorid: any;
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  obrazky: any;
  hlavniObrazek: any;
  recepty: any = [];
  jmeno: any;
  prijmeni: any;
  email: any;

  constructor(public _apiService: ApiService, private route: ActivatedRoute, private idService: IdServiceService,
              private router: Router) {this.getUserRecepty(this.autorid);this.getUser(this.id);}
  deleteRecept(id) {
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.deleteRecept(id).subscribe((res: any) => {
      console.log('SUCCESS');
      this.getUserRecepty(this.autorid);
    }, (err: any) =>{
      console.log('ERROR');
    });
  }

  async getUser(id) {
    const {value} = await Storage.get({key: 'id'});
    this.id = value;
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getUser(this.id).subscribe((res: any) => {
      console.log('SUCCESS', res);
      const user = res[0];
      this.jmeno = user.jmeno;
      this.prijmeni = user.prijmeni;
      this.email = user.email;
    }, (error: any) => {
      console.log('ERROR', error);
    });
  }

  ngOnInit() {
  }


  async getUserRecepty(autorid) {
    const {value} = await Storage.get({key: 'id'});
    this.autorid = value;
    // ziskam si z databaze všechny recepty od uzivatele s id value
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getUserRecepty(this.autorid).subscribe(async (res: any) => {
      console.log('SUCCESS', res);
      this.recepty = res;
    }, (err: any) => {
      console.log('ERROR', err);
    });

  }

  async logout() {
    await Storage.remove({key: 'id'});
  }
}
