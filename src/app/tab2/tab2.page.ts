import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Storage} from '@capacitor/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  nazev: any;
  popisek: any;
  postup: any;
  ingredience: any;
  hlavniObrazek: any;
  recepty: any = [];
  autorid: any;
  ionicForm: FormGroup;
  success = 1;
  isSubmitted = false;

  constructor(public _apiService: ApiService, public formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
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

  async addRecept() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const {value} = await Storage.get({key: 'id'});
      this.autorid = value;
      const data = {
        nazev: this.nazev,
        popisek: this.popisek,
        postup: this.postup,
        ingredience: this.ingredience,
        hlavniObrazek: this.hlavniObrazek,
        autorid: this.autorid,

        //hlavniObrazek: null,
      };
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.addRecept(data).subscribe(async (res: any) => {
        console.log('SUCCESS ===', res);
        this.nazev = '';
        this.popisek = '';
        this.postup = '';
        this.ingredience = '';
        this.hlavniObrazek = '';
        this.autorid = '';
        this.router.navigateByUrl('/tabs/tab1');
        this.isSubmitted = false;
        alert('SUCCESS');
      }, (error: any) => {
        alert('ERROR');

        console.log('ERROR ===', error);
      });
    }
  };
}

