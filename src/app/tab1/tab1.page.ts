import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  clicked1 = false;
  clicked2 = false;
  clicked3 = false;
  clicked4 = false;
  clicked5 = false;
  clicked6 = false;
  clickedD2 = false;
  clickedD1 = false;
  clickedD3 = false;
  databaseOrder: any;
  obtiznost: any;
  sortby: any;
  kategorie: any;
  nazev: any;
  popisek: any;
  postup: any;
  recepty: any[] = [];
  autorid = null;
  iduser: any;
  heart = false;
  i = 0;
  id: any;

  constructor(public apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) {
    this.getRecepty();
  }

  doRefresh(event) {
    //console.log('Begin async operation');
    //window.location.reload();
    this.getRecepty();
    setTimeout(() => {
      //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getRecepty() {
    //získám všechny recepty
    this.apiService.getRecepty().subscribe((res: any) => {
      console.log('SUCCESS ===', res);
      this.recepty = res;
    }, (error: any) => {
      console.log('ERROR ===', error);
    });
  }

  sortby1() {
    this.clicked1 = this.clicked1 === false;
    this.getReceptByCathegory();
  }sortby2() {
    this.clicked2 = this.clicked2 === false;
    this.getReceptByCathegory();
  }sortby3() {
    this.clicked3 = this.clicked3 === false;
    this.getReceptByCathegory();
  }sortby4() {
    this.clicked4 = this.clicked4 === false;
    this.getReceptByCathegory();
  }sortby5() {
    this.clicked5 = this.clicked5 === false;
    this.getReceptByCathegory();
  }sortby6() {
    this.clicked6 = this.clicked6 === false;
    this.getReceptByCathegory();
  }
  difficulty1() {
    this.clickedD1 = this.clickedD1 === false;
    this.getReceptByCathegory();
  }
  difficulty2() {
    this.clickedD2 = this.clickedD2 === false;
    this.getReceptByCathegory();
  }
  difficulty3() {
    this.clickedD3 = this.clickedD3 === false;
    this.getReceptByCathegory();
  }
  getReceptByCathegory(){
    //získám recepty
    this.databaseOrder= '';
    this.sortby= '';
    this.obtiznost = '';
    if(this.clicked1 === true){
      if(this.databaseOrder ===''){
        this.databaseOrder = 'WHERE idcathegory = 1';
      }
      else{
        this.databaseOrder = this.databaseOrder +' OR idcathegory = 1';
      }
    }
    if(this.clicked2 === true){
      if(this.databaseOrder ===''){
        this.databaseOrder = 'WHERE idcathegory = 2';
      }
      else{
        this.databaseOrder = this.databaseOrder +' OR idcathegory = 2';
      }
    }
    if(this.clicked3 === true){
      if(this.databaseOrder ===''){
        this.databaseOrder = 'WHERE idcathegory = 3';
      }
      else{
        this.databaseOrder = this.databaseOrder +' OR idcathegory = 3';
      }
    }
    if(this.clicked4 === true){
      if(this.databaseOrder ===''){
        this.databaseOrder = 'WHERE idcathegory = 4';
      }
      else{
        this.databaseOrder = this.databaseOrder +' OR idcathegory = 4';
      }
    }
    if(this.clicked5 === true){
      if(this.databaseOrder ===''){
        this.databaseOrder = 'WHERE idcathegory = 5';
      }
      else{
        this.databaseOrder = this.databaseOrder +' OR idcathegory = 5';
      }
    }
    if(this.clicked6 === true){
      if(this.databaseOrder ===''){
        this.databaseOrder = 'WHERE idcathegory = 6';
      }
      else{
        this.databaseOrder = this.databaseOrder +' OR idcathegory = 6';
      }
    }
    // jetslize je zakliknuta nejaka z obtiznosti
    if(this.clickedD1 === true || this.clickedD2 === true || this.clickedD3 === true){
      // je to 1
      if(this.clickedD1 === true){
        // není žádný příkaz a ani žádná obtžnost
        if(this.databaseOrder ==='' && this.obtiznost ===''){
          this.obtiznost = ' WHERE obtiznost = 1 ';
        }
        else if(this.clickedD3===true){
          this.obtiznost = ' AND (obtiznost = 1 OR obtiznost = 3) ';
        }
        else if(this.clickedD2===true){
          this.obtiznost = ' AND (obtiznost = 1 OR obtiznost = 2) ';
        }
        else{
          this.obtiznost = ' AND obtiznost = 1 ';
        }
      }
      if(this.clickedD2 === true){
        if(this.databaseOrder ==='' && this.obtiznost ===''){
          this.obtiznost = ' WHERE obtiznost = 2 ';
        }
        else if(this.clickedD3===true){
          this.obtiznost = ' AND (obtiznost = 2 OR obtiznost = 3) ';
        }
        else if(this.clickedD1===true){
          this.obtiznost = ' AND (obtiznost = 2 OR obtiznost = 1) ';
        }
        else{
          this.obtiznost = ' AND obtiznost = 2 ';
        }
      }
      if(this.clickedD3 === true){
        if(this.databaseOrder ==='' && this.obtiznost ===''){
          this.obtiznost = ' WHERE obtiznost = 3 ';
        }
        else if(this.clickedD2===true && this.clickedD1===true){
          this.obtiznost = ' AND (obtiznost = 1 OR obtiznost = 3 OR obtiznost = 2) ';
        }
        else if(this.clickedD1===true){
          this.obtiznost = ' AND (obtiznost = 1 OR obtiznost = 3) ';
        }
        else if(this.clickedD2===true){
          this.obtiznost = ' AND (obtiznost = 3 OR obtiznost = 2) ';
        }
        else{
          this.obtiznost = ' AND obtiznost = 3 ';
        }
      }
      /*if(this.sortby!==''){
        this.sortby = this.databaseOrder.replace('WHERE', 'WHERE (');
        this.sortby = this.sortby + ') ';
        this.databaseOrder =  this.sortby + this.obtiznost ;
      }
      else{
        this.databaseOrder = this.obtiznost;
      }*/
      if(this.databaseOrder===''){
        this.databaseOrder = this.obtiznost;
      }
      else{
        this.sortby = this.databaseOrder.replace('WHERE', 'WHERE (');
        this.sortby = this.sortby + ') ';
        this.databaseOrder =  this.sortby + this.obtiznost ;
      }
    }

    console.log('tohle je final '+this.databaseOrder);
    // eslint-disable-next-line no-underscore-dangle
    this.apiService.getReceptyByCathegory(this.databaseOrder).subscribe((res: any) => {
      console.log('setridene podle kategorie ', res);
      //console.log(this.sortby);
      this.recepty = res;
    }, (error: any) => {
      console.log('ERROR ===', error);
    });
  }
}
