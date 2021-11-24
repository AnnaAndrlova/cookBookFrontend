import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.page.html',
  styleUrls: ['./createuser.page.scss'],
})
export class CreateuserPage implements OnInit {
  id:any;
  jmeno: any;
  prijmeni: any;
  email: any;
  heslo: any;
  link = "";
  success = 1;

  constructor(public _apiService: ApiService) {
  }

  addUser(){
    let data = {
      jmeno: this.jmeno,
      prijmeni: this.prijmeni,
      email: this.email,
      heslo: this.heslo,
    }
    this._apiService.addUser(data).subscribe((res:any) => {
      console.log("SUCCESS ===", res);
      this.jmeno = '';
      this.prijmeni = '';
      this.email = '';
      this.heslo= '';
      console.log(this.id);
      alert('SUCCESS');
      // todo vyřešit nepřesměrování!!!!!!
      //this.getRecepty();
    }, (error:any) =>{
      this.success = 0;
      alert('ERROR');
      console.log("ERROR ===", error);
    }
   )
    /*if(this.success === 1){
      this.router.navigateByUrl('/tabs/tab1');
    }*/
  }


  getUser(id){
    this._apiService.getRecept(id).subscribe((res:any) => {
      console.log("SUCCESS", res);
      let user = res[0];
      this.id = user.id;
      console.log(this.id);
    }, (error:any) =>{
      console.log("ERROR", error);
    })
  }

  ngOnInit() {
  }

}
