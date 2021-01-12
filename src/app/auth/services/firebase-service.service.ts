import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private firestore:AngularFirestore) { }


  getNotices(){
    return this.firestore.collection("notices").snapshotChanges();
  }


  createNotice(notice:any){
    return this.firestore.collection("notices").add(notice);
  }


  updateNotice(id:any, notice:any){
    return this.firestore.collection("notices").doc(id).update(notice);
  }


  deleteNotice(id:any){
    return this.firestore.collection("notices").doc(id).delete();
  }

}
