import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirebaseServiceService } from 'src/app/auth/services/firebase-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService, FirebaseServiceService]
})
export class HomeComponent implements OnInit {

  public user$: Observable<any> = this.authSvc.afAuth.user;
  user = JSON.parse(sessionStorage.getItem('dataSesion'));

  // config:any;
  // collection = {count:60, data:[]}
  

  commentForm = new FormGroup({
    commentText: new FormControl(''),
  });


  


  notices = [
    // {
    //   _id : '1212kjkkjk',
    //   emailUser : 'hluisfernando1@gmail.com',
    //   publication : 'lo que se viene hoy es muy interesante',
    //   likes:2,
    //   viewComments: false,
    //   comments:[
    //     {_id:'28dj', emailUser:'g@gmail.com', publication:'lo es!!'},
    //     {_id:'heh2g2', emailUser:'a@gmail.com', publication:'no lo creo'},
    //     {_id:'6hsg', emailUser:'c@gmail.com', publication:'puede ser, pero debemos esperar.'},
    //   ]
    // },
    // {
    //   _id : 'ff_kj223',
    //   emailUser : 'jaimeLan@gmail.com',
    //   publication : 'dias duros para el empleo en colombia',
    //   likes:2,
    //   comments:[
    //     {_id:'dufuf7d9798', emailUser:'d@gmail.com', publication:'insertidumbre total'},
    //     {_id:'38jkdsj', emailUser:'e@gmail.com', publication:'a ver si empezando año todo se pone mejor'},
    //     {_id:'asdl93_a', emailUser:'f@gmail.com', publication:'mucha abundancia llegara!!'}
    //   ]
    // }
  ]

  constructor(private authSvc:AuthService, private firestoreSvc:FirebaseServiceService) { }

  ngOnInit(): void {
    this.getNotices();
  }


  getNotices(){
    this.firestoreSvc.getNotices().subscribe(response =>{
        this.notices = response.map((e:any)=>{
          return{
            _id: e.payload.doc.id,
            emailUser : e.payload.doc.data().emailUser,
            publication : e.payload.doc.data().publication,
            likes : e.payload.doc.data().likes,
            viewComments: e.payload.doc.data().viewComments,
            comments : e.payload.doc.data().comments,
          }
        })

        console.log('.-.-.-.-.');
        console.log(this.notices)
        console.log('.-.-.-.-.');
      },
      error =>{
        console.log(error);
      }
    )
  }

  
  toPost(event){
    this.firestoreSvc.createNotice({
      emailUser : this.user.email,
      publication : event,
      likes:0,
      viewComments: false,
      comments:[]
    }).then(response => {
      // AGREGAR MENSAJE
      console.log('COLOCAR MENSAJE DE QUE SE A CREADO');
    }).catch(error => {
      console.log(error);
    })
  }

  
  viewComments(row){
    if(this.notices[this.getKeyObject(row._id)].viewComments){
      this.notices[this.getKeyObject(row._id)].viewComments = false;
    } else {
      this.notices[this.getKeyObject(row._id)].viewComments = true;
    }
  }

  // AGREGAR A BASE DE DATOS
  onComment(row){
    if(this.commentForm.get('commentText').value){
      this.notices[this.getKeyObject(row._id)].comments.push(
        {_id:'comment_' + Math.floor(Math.random() * 999999), emailUser:this.user.email, publication:this.commentForm.get('commentText').value}
      )
      this.firestoreSvc.updateNotice(row._id, this.notices[this.getKeyObject(row._id)]).then(response =>{
        // AGREGAR MENSAJE
        console.log('COLOCAR MENSAJE DE QUE SE A ACTUALIZADO');
      }).catch(error => {
        console.log(error);
      })

      this.commentForm.controls.commentText.setValue('');
    }
  }


  // AGREGAR A BASE DE DATOS
  moreLike(row){
    this.notices[this.getKeyObject(row._id)].likes =  this.notices[this.getKeyObject(row._id)].likes + 1;

    this.firestoreSvc.updateNotice(row._id, this.notices[this.getKeyObject(row._id)]).then(response =>{
      // AGREGAR MENSAJE
      console.log('COLOCAR MENSAJE DE QUE SE A ACTUALIZADO LIKE');
    }).catch(error => {
      console.log(error);
    })

  }




  deletePost(id){
    this.firestoreSvc.deleteNotice(id).then(response =>{
      // AGREGAR MENSAJE
      console.log('COLOCAR MENSAJE DE QUE SE A ELIMINADO');
    }).catch(error => {
      console.log(error);
    })
  }



  
  getKeyObject(_id) {
    return this.notices.map((e) => {
      return e._id;
    }).indexOf(_id);
  }

}
