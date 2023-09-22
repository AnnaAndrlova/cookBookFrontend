import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {Storage} from '@capacitor/storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  id: any;
  jmeno: any;
  prijmeni: any;
  email: any;
  heslo: any;
  avatar: any;
  selectedFile = null;
  selectedFiles = null;
  nahrano = false;
  fileName = '';
  file = '';


  constructor(private route: ActivatedRoute,
              private router: Router,
              public _apiService: ApiService,
              private http: HttpClient
  ) {

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      console.log(this.id);
      this.getUser(this.id);
    });
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.selectedFiles = event.target.files[0].name;
    this.nahrano = true;
    this.upload(this.id).subscribe(response => {
      console.log('SUCCESS Upload');
    });
  }

  ngOnInit() {
  }
  getUrl(endpoint: string) {
    return environment.apiBase + endpoint;
  }
  async getUser(id) {
    const {value} = await Storage.get({key: 'id'});
    this.id = value;
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.getUser(this.id).subscribe((res: any) => {
      console.log('SUCCESS', res);
      const user = res[0];
      this.jmeno = user.jmeno;
      this.prijmeni = user.prijmeni;
      this.email = user.email;
      this.heslo = user.heslo;
      this.avatar = user.avatar;
    }, (error: any) => {
      console.log('ERROR', error);
    });
  }
  async updateUser() {
    const {value} = await Storage.get({key: 'id'});
    this.id = value;
    const data = {
      jmeno: this.jmeno,
      prijmeni: this.prijmeni,
      email: this.email,
      heslo: this.heslo,
    };
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.updateUser(this.id, data).subscribe((res: any) => {
      console.log('SUCCESS', res);
      this.router.navigateByUrl('/tabs/tab4');
    }, (err: any) => {
      console.log('ERROR', err);
    });
  }
  upload(userId: number) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.nahrano = false;
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('user_id', userId.toString());
      return this.http.post(environment.apiBase + '/user/uploadUser.php', formData);
    }
  }
}
