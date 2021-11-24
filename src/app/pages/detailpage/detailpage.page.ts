import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.page.html',
  styleUrls: ['./detailpage.page.scss'],
})
export class DetailpagePage implements OnInit {
  id: any;
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  obrazky: any;
  hlavniObrazek: any;
  showData = 'description';
  constructor(private route:ActivatedRoute,
              private router: Router,
              private _apiService: ApiService,) {
    this.route.params.subscribe((param:any) => {
      this.id = param.id;
      console.log(this.id);
      this.getRecept(this.id);
    })
  }

  ngOnInit() {
  }
  getRecept(id){
    this._apiService.getRecept(id).subscribe((res:any) => {
      console.log("SUCCESS", res);
      let recept = res[0];
      this.nazev = recept.nazev;
      this.popisek = recept.popisek;
      this.postup = recept.postup;
      this.ingredience= recept.ingredience;
      this.obrazky= recept.obrazky;
      this.hlavniObrazek= recept.hlavniObrazek;
    }, (error:any) =>{
      console.log("ERROR", error);
    })
  }
  segmentChanged(event: any) {
    this.showData = event.detail.value;
  }

}
