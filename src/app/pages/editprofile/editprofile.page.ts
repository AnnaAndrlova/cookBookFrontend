import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

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


  constructor(private route:ActivatedRoute,
              private router: Router,
              private _apiService: ApiService,
  ) {

    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      console.log(this.id);
      this.getUser(this.id);
    })
  }

  ngOnInit() {
  }
  getUser(id){
    this._apiService.getUser(id).subscribe((res:any) => {
      console.log("SUCCESS", res);
      let user = res[0];
      this.jmeno = user.jmeno;
      this.prijmeni = user.prijmeni;
      this.email = user.email;
      this.heslo= user.heslo;
    }, (error:any) =>{
      console.log("ERROR", error);
    })
  }
  updateUser() {
    let data = {
      jmeno: this.jmeno,
      prijmeni: this.prijmeni,
      email: this.email,
      heslo: this.heslo,
    }
    this._apiService.updateUser(this.id, data).subscribe((res:any) => {
      console.log("SUCCESS", res);
      this.router.navigateByUrl('/tabs/tab1');
    }, (err:any) =>{
      console.log("ERROR", err);
    })
  }

}
