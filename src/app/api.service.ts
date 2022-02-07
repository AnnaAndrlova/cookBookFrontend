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
  addFavouriteRecept(data) {
    return this.http.post('http://localhost/php/kucharkav2/backend/favourites/createFavourite.php',data);
  }
  addUser(data) {
    return this.http.post('http://localhost/php/kucharkav2/backend/user/createUser.php',data);
  }
  getRecepty(){
    return this.http.get('http://localhost/php/kucharkav2/backend/getRecept.php');
  }
  getReceptyByCathegory(databaseOrder){
    return this.http.get('http://localhost/php/kucharkav2/backend/getReceptByCathegory.php?databaseOrder='+databaseOrder);
  }
  deleteRecept(id){
    return this.http.delete('http://localhost/php/kucharkav2/backend/delete.php?id='+id);
  }
  deleteFavouriteRecept(iduserandidrecept){
    return this.http.delete('http://localhost/php/kucharkav2/backend/favourites/deleteFavourite.php?iduserandidrecept='+iduserandidrecept);
  }
  getRecept(id){
    return this.http.get('http://localhost/php/kucharkav2/backend/getSingleRecept.php?id='+id);
  }
  getFavouriteRecept(recepty){
    return this.http.get('http://localhost/php/kucharkav2/backend/getFavouriteRecept.php?recepty='+ recepty);
  }
  getUser(id){
    return this.http.get('http://localhost/php/kucharkav2/backend/user/getSingleUser.php?id='+id);
  }
  getPassword(email){
    return this.http.get('http://localhost/php/kucharkav2/backend/user/getPassword.php?email='+email);
  }
  getEmail(){
    return this.http.get('http://localhost/php/kucharkav2/backend/user/getEmail.php');
  }
  getUserRecepty(autorid){
    return this.http.get('http://localhost/php/kucharkav2/backend/getUserRecepty.php?autorid='+autorid);
  }
  getFavouriteReceptId(iduser){
    return this.http.get('http://localhost/php/kucharkav2/backend/favourites/getFavourite.php?iduser='+iduser);
  }
  updateRecept(id, data){
    return this.http.put('http://localhost/php/kucharkav2/backend/updateRecept.php?id='+id, data);
  }
  updateUser(id, data){
    return this.http.put('http://localhost/php/kucharkav2/backend/user/updateUser.php?id='+id, data);
  }
}
