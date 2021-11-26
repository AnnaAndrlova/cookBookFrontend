import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  iduser: any;
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
  constructor(public _apiService: ApiService,private route: ActivatedRoute,
              private router: Router) {this.getRecepty();
    this.route.params.subscribe((param: any) => {
    this.iduser = param.id;
    console.log(this.iduser);
    //this.getUser(this.iduser);
  }); }

  getRecepty(){
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getRecepty().subscribe((res: any) => {
      console.log('SUCCESS ===', res);
      this.recepty = res;
    }, (error: any) =>{
      console.log('ERROR ===', error);
    });
  }
  deleteRecept(id) {
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.deleteRecept(id).subscribe((res: any) => {
      console.log('SUCCESS');
      this.getRecepty();
    }, (err: any) =>{
      console.log('ERROR');
    });
  }

  getUser(id){
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getUser(id).subscribe((res: any) => {
      console.log('SUCCESS', res);
      const user = res[0];
      this.jmeno = user.jmeno;
      this.prijmeni= user.prijmeni;
      this.email= user.email;
    }, (error: any) =>{
      console.log('ERROR', error);
    });
  }

  ngOnInit() {
  }

}
