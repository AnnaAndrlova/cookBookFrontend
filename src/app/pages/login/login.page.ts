import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../api.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public id: number;
  email: any;
  heslo: any;
  routerlink : any;

  constructor(private _apiService: ApiService, private router: Router) {
    this.login(this.email);
  }

  ngOnInit() {
  }
  login(email) {
    //email zadany uzivatelem
  console.log(this.email);
  // ziskam si z databaze email a heslo
    this._apiService.getPassword(email).subscribe((res:any) => {
      console.log("SUCCESS", res);
      if(res.length == 0){
        console.log("uživatel neexistuje")
      }
      let login = res[0];
      if((this.heslo == login.heslo )&&(this.email == login.email)){
        console.log("anicko, jsi borec");
        this.router.navigateByUrl('/tabs/tab1');
        this.id = login.id;
      }
      else{
        console.log("špatné heslo")
      }

      //console.log(email);
      //console.log(this.email);
    }, (err:any) =>{
      console.log("ERROR", err);
    })

  }
}
