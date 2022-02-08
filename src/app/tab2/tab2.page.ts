import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Storage} from '@capacitor/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  obtiznost: any;
  kategorie: any;
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
  reader: any;
  uploadedImage: any;
  selectedFile = null;
  nahrano = false;


  constructor(public _apiService: ApiService, public formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
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
  onFileSelected(event) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.selectedFile = event.target.files[0].name;
    this.nahrano = true;
    //return this.selectedFile;
    //console.log(this.selectedFile);
  }

  async addRecept() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const {value} = await Storage.get({key: 'id'});
      this.autorid = value;
      //this.onFileSelected(this.hlavniObrazek);
      //pak tohle id poslu zpátky a ulozim ho do databaze recepty pod nazev kategorie
      const data = {
        nazev: this.nazev,
        popisek: this.popisek,
        postup: this.postup,
        ingredience: this.ingredience,
        hlavniObrazek: this.selectedFile,
        autorid: this.autorid,
        kategorie: this.kategorie,
        obtiznost: this.obtiznost

        //hlavniObrazek: null,
      };
      //console.log('toto je obrazek: ' + data.hlavniObrazek);
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.addRecept(data).subscribe(async (res: any) => {
        console.log('SUCCESS ===', res);
        this.nazev = '';
        this.popisek = '';
        this.postup = '';
        this.ingredience = '';
        this.hlavniObrazek = '';
        this.autorid = '';
        this.kategorie ='';
        this.obtiznost = '';
        this.router.navigateByUrl('/tabs/tab1');
        this.isSubmitted = false;
        alert('SUCCESS');
      }, (error: any) => {
        alert('ERROR');

        console.log('ERROR ===', error);
      });
    }
  };


  /*onUpload(){
    this.http.post('')
  }*/
}

