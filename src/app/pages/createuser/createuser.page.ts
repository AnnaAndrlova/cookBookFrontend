import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.page.html',
  styleUrls: ['./createuser.page.scss'],
})
export class CreateuserPage implements OnInit {
  id: any;
  jmeno: any;
  prijmeni: any;
  email: any;
  heslo: any;
  link = '';
  success = 1;
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public _apiService: ApiService,public formBuilder: FormBuilder,private router: Router) {}
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
  }


  // @ts-ignore
  get errorControl() {
    return this.ionicForm.controls;
  }

  addUser(){
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.ionicForm.value);
      const data = {
        jmeno: this.jmeno,
        prijmeni: this.prijmeni,
        email: this.email,
        heslo: this.heslo,
      };
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.addUser(data).subscribe((res: any) => {
          console.log('SUCCESS ===', res);
          this.jmeno = '';
          this.prijmeni = '';
          this.email = '';
          this.heslo= '';
          console.log(this.id);
          this.router.navigateByUrl('/login');
          alert('SUCCESS');
        }, (error: any) =>{
          this.success = 0;
          alert('ERROR');
          console.log('ERROR ===', error);
        }
      );
    }
  }



}
