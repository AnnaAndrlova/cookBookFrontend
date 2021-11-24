import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  obrazky: any;
  hlavniObrazek: any;
  recepty: any = [];
  constructor(public _apiService: ApiService) {this.getRecepty(); }

  getRecepty(){
    this._apiService.getRecepty().subscribe((res:any) => {
      console.log("SUCCESS ===", res);
      this.recepty = res;
    }, (error:any) =>{
      console.log("ERROR ===", error);
    })
  }
  deleteRecept(id) {
    this._apiService.deleteRecept(id).subscribe((res:any) => {
      console.log("SUCCESS");
      this.getRecepty();
    }, (err:any) =>{
      console.log("ERROR");
    })
  }

  ngOnInit() {
  }

}
