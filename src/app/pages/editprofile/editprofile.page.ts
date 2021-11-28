import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {Storage} from "@capacitor/storage";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  id: any;
  jmeno: any;
  prijmeni: any;
  email: any;
  heslo: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private _apiService: ApiService,
  ) {

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      console.log(this.id);
      this.getUser(this.id);
    });
  }

  ngOnInit() {
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
      this.heslo = user.heslo;
    }, (error: any) => {
      console.log('ERROR', error);
    });
  }
  async updateUser() {
    const {value} = await Storage.get({key: 'id'});
    this.id = value;
    const data = {
      jmeno: this.jmeno,
      prijmeni: this.prijmeni,
      email: this.email,
      heslo: this.heslo,
    };
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.updateUser(this.id, data).subscribe((res: any) => {
      console.log('SUCCESS', res);
      this.router.navigateByUrl('/tabs/tab4');
    }, (err: any) => {
      console.log('ERROR', err);
    });
  }

}
