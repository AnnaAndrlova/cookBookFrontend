import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

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
  badmail = 0;

  // eslint-disable-next-line max-len
  constructor(public _apiService: ApiService, public formBuilder: FormBuilder, private router: Router,
              public toastController: ToastController) {

  }

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

  addUser() {
    this.isSubmitted = true;
    // @ts-ignore
    if (!this.ionicForm.valid) {
      return false;
    } else {
      const data = {
        jmeno: this.jmeno,
        prijmeni: this.prijmeni,
        email: this.email,
        heslo: this.heslo,
      };
      // získám si z databáze všechny maily a porovnám je se zadaným mailem
      // eslint-disable-next-line no-underscore-dangle
      this._apiService.getEmail().subscribe(async (res: any) => {
        console.log('Maily: ', res);
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < res.length; i++) {
          if (this.email === res[i].email) {
            this.badmail = 1;
            console.log('Mail existuje!!!!!!!');
          } else {
            this.badmail = 0;
          }
        }
        //pokud mail existuje, vypis to
        if (this.badmail === 0) {
          // eslint-disable-next-line no-underscore-dangle
          this._apiService.addUser(data).subscribe((ree: any) => {
              console.log('SUCCESS ===', ree);
              this.jmeno = '';
              this.prijmeni = '';
              this.email = '';
              this.heslo = '';
              console.log(this.id);
              this.router.navigateByUrl('/login');
              alert('SUCCESS');
            }, (error: any) => {
              this.success = 0;
              alert('ERROR');
              console.log('ERROR ===', error);
            }
          );
        } else {
          const baduser = await this.toastController.create({
            message: 'Uživatel s tímto e-mailem již existuje, zadejte prosím nějaký jiný.',
            duration: 2000
          });
          baduser.present();
        }
      });
    }
  }

}
