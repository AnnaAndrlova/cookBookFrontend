import {Component, OnInit, Output} from '@angular/core';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public id: number;
  email: any;
  heslo: any;
  routerlink: any;

  constructor(private _apiService: ApiService, private router: Router, public toastController: ToastController) {}
  ngOnInit() {
  }
  login(email) {
  // ziskam si z databaze email a heslo
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getPassword(email).subscribe(async (res: any) => {
      console.log('SUCCESS', res);

      // eslint-disable-next-line eqeqeq
      if (res.length === 0) {
        console.log('uživatel neexistuje');
        const baduser = await this.toastController.create({
          message: 'Nesprávný e-mail. Zadejte váš e-mail.',
          duration: 2000
        });
        baduser.present();
      }
      if (res.length !== 0) {
        const login = res[0];
        if ((this.heslo === login.heslo) && (this.email === login.email)) {
          console.log('anicko, jsi borec');
          this.router.navigateByUrl('/tabs/tab4');
          this.id = login.id;
        } else {
          console.log('špatné heslo');
          const wrongpassword = await this.toastController.create({
            message: 'Špatné heslo. Zkuste to znovu.',
            duration: 2000
          });
          wrongpassword.present();
        }
      }
    }, (err: any) =>{
      console.log('ERROR', err);
    });

  }
}
