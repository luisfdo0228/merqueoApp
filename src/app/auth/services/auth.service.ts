import { first } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';



@Injectable()
export class AuthService {


  constructor(public afAuth: AngularFireAuth) { }


  /**
   * @author Luis Fernando Hernandez
   * @param email 
   * @param password 
   * @description servicio que comunica con firebase para logearse
   */
  async login(email:string, password:string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password)
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author Luis Fernando Hernandez
   * @param email 
   * @param password 
   * @description servicio que comunica con firebase para registrarse
   */
  async register(email:string, password:string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author Luis Fernando Hernandez
   * @param email 
   * @param password 
   * @description servicio que comunica con firebase para cerrar sesion
   */
  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

}
