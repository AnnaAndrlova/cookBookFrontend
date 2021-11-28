import {Component, OnInit, Output} from '@angular/core';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {IdServiceService} from '../../id-service.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public id: any;
  name: any;
  email: any;
  heslo: any;
  routerlink: any;
  userid: string;

  // eslint-disable-next-line max-len
  constructor(private _apiService: ApiService, private router: Router, public toastController: ToastController) {}
  ngOnInit() {
  }
  login(email) {
  // ziskam si z databaze email a heslo
    // eslint-disable-next-line no-underscore-dangle
    // @ts-ignore
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
          console.log('přihlášení proběhlo úspěšně');
          this.router.navigateByUrl('/tabs/tab4');
          this.id = login.id;
          await Storage.set({
              key: 'id',
              value: this.id,
            });
          /*
          // eslint-disable-next-line no-underscore-dangle
          this._apiService.saveUserId(this.id).subscribe((bob: any) => {
            console.log('SUCCESS', bob);
          }, (error: any) =>{
            console.log('ERROR', error);
          });
         */
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
