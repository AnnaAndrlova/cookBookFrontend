import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: HttpHeaders;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');

  }
  addRecept(data) {
    return this.http.post('http://localhost/php/kucharkav2/backend/create.php',data);
  }
  addUser(data) {
    return this.http.post('http://localhost/php/kucharkav2/backend/user/createUser.php',data);
  }
  getRecepty(){
    return this.http.get('http://localhost/php/kucharkav2/backend/getRecept.php');
  }
  deleteRecept(id){
    return this.http.delete('http://localhost/php/kucharkav2/backend/delete.php?id='+id);
  }
  getRecept(id){
    return this.http.get('http://localhost/php/kucharkav2/backend/getSingleRecept.php?id='+id);
  }
  getUser(id){
    return this.http.get('http://localhost/php/kucharkav2/backend/user/getSingleUser.php?id='+id);
  }
  getPassword(email){
    return this.http.get('http://localhost/php/kucharkav2/backend/user/getPassword.php?email='+email);
  }
  getUserRecepty(autorid){
    return this.http.get('http://localhost/php/kucharkav2/backend/getUserRecepty.php?autorid='+autorid);
  }
  updateRecept(id, data){
    return this.http.put('http://localhost/php/kucharkav2/backend/updateRecept.php?id='+id, data);
  }
  updateUser(id, data){
    return this.http.put('http://localhost/php/kucharkav2/backend/pages/updateUser.php?id='+id, data);
  }
}
