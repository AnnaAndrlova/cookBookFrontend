import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-update-recept',
  templateUrl: './update-recept.page.html',
  styleUrls: ['./update-recept.page.scss'],
})
export class UpdateReceptPage implements OnInit {
  autorid: any;
  id: any;
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  hlavniObrazek: any;
  ionicForm: FormGroup;
  success = 1;
  isSubmitted = false;
  kategorie: any;
  obtiznost: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private _apiService: ApiService,
              public formBuilder: FormBuilder
  ) {

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      console.log(this.id);
      this.getRecept(this.id);
    });
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      obtiznost: ['', [Validators.required]],
      kategorie: ['', [Validators.required]],
      nazev: ['', [Validators.required]],
      popisek: ['', [Validators.required]],
      postup: ['', [Validators.required]],
      ingredience: ['', [Validators.required]],
      hlavniobrazek: ['', [Validators.required]],
    });
  }

  // @ts-ignore
  get errorControl() {
    return this.ionicForm.controls;
  }

  getRecept(id) {
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getRecept(id).subscribe((res: any) => {
      console.log('SUCCESS', res);
      const recept = res[0];
      this.nazev = recept.nazev;
      this.popisek = recept.popisek;
      this.postup = recept.postup;
      this.ingredience = recept.ingredience;
      this.hlavniObrazek = recept.hlavniObrazek;
      this.autorid = recept.autorid;
      this.kategorie = recept.kategorie;
      this.obtiznost = recept.obtiznost;
    }, (error: any) => {
      console.log('ERROR', error);
    });
  }

  updateRecept() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Zadejste prosím validní informace');
      return false;
    } else {
      const data = {
        nazev: this.nazev,
        popisek: this.popisek,
        postup: this.postup,
        ingredience: this.ingredience,
        hlavniObrazek: this.hlavniObrazek,
        autorid: this.autorid,
        kategorie: this.kategorie,
        obtiznost: this.obtiznost,
      };
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.updateRecept(this.id, data).subscribe((res: any) => {
        console.log('SUCCESS', res);
        this.router.navigateByUrl('/tabs/tab4');
      }, (err: any) => {
        console.log('ERROR', err);
      });
    }
  }
}
