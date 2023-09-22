import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';


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
    return this.http.post(environment.apiBase + '/create.php',data);
  }
  addFavouriteRecept(data) {
    return this.http.post(environment.apiBase + '/favourites/createFavourite.php',data);
  }
  addUser(data) {
    return this.http.post(environment.apiBase +  '/user/createUser.php',data);
  }
  getRecepty(){
    return this.http.get(environment.apiBase +  '/getRecept.php');
  }
  getReceptyByCathegory(databaseOrder){
    return this.http.get(environment.apiBase +  '/getReceptByCathegory.php?databaseOrder='+databaseOrder);
  }
  deleteRecept(id){
    return this.http.delete(environment.apiBase + '/delete.php?id='+id);
  }
  deleteFavouriteRecept(iduserandidrecept){
    return this.http.delete(environment.apiBase + '/favourites/deleteFavourite.php?iduserandidrecept='+iduserandidrecept);
  }
  getRecept(id){
    return this.http.get(environment.apiBase + '/getSingleRecept.php?id='+id);
  }
  getFavouriteRecept(recepty){
    return this.http.get(environment.apiBase + '/getFavouriteRecept.php?recepty='+ recepty);
  }
  getUser(id){
    return this.http.get(environment.apiBase + '/user/getSingleUser.php?id='+id);
  }
  getPassword(email){
    return this.http.get(environment.apiBase + '/user/getPassword.php?email='+email);
  }
  getEmail(){
    return this.http.get(environment.apiBase + '/user/getEmail.php');
  }
  getUserRecepty(autorid){
    return this.http.get(environment.apiBase + '/getUserRecepty.php?autorid='+autorid);
  }
  getFavouriteReceptId(iduser){
    return this.http.get(environment.apiBase + '/favourites/getFavourite.php?iduser='+iduser);
  }
  updateRecept(id, data){
    return this.http.put(environment.apiBase + '/updateRecept.php?id='+id, data);
  }
  updateUser(id, data){
    return this.http.put(environment.apiBase + '/user/updateUser.php?id='+id, data);
  }

  getUrl(endpoint: string) {
    return environment.apiBase + endpoint;
  }
}
