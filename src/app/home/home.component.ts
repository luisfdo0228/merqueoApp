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
  // declaracion de variables
  public user$: Observable<any> = this.authSvc.afAuth.user;
  user = JSON.parse(sessionStorage.getItem('dataSesion'));
  notices = []
  commentForm = new FormGroup({
    commentText: new FormControl(''),
  });

  constructor(private authSvc:AuthService, private firestoreSvc:FirebaseServiceService) { }

  ngOnInit(): void {
    // al iniciar el componente traemos todos los estados , para presentarlos en pantalla
    this.getNotices();
  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga 
   * de llamar el servicio que retorna 
   * la lista de las noticias
   */
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
      },
      error =>{
        console.log(error);
      }
    )
  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga
   * de resivir el mensaje del componente hijo
   * para posteriormente pasar a guardarlo en la
   * base de datos (firebase)
   * @param event
   */
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


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga 
   * @param row
   */
  viewComments(row){
    if(this.notices[this.getKeyObject(row._id)].viewComments){
      this.notices[this.getKeyObject(row._id)].viewComments = false;
    } else {
      this.notices[this.getKeyObject(row._id)].viewComments = true;
    }
  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga
   * de permitirle a los usuarios comentar diferentes estados publicados
   * @param row
   */
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


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se le permite 
   * a los usuarios darle like a las diferentes publicaciones
   * @param row
   */
  moreLike(row){
    this.notices[this.getKeyObject(row._id)].likes =  this.notices[this.getKeyObject(row._id)].likes + 1;

    this.firestoreSvc.updateNotice(row._id, this.notices[this.getKeyObject(row._id)]).then(response =>{
      // AGREGAR MENSAJE
      console.log('COLOCAR MENSAJE DE QUE SE A ACTUALIZADO LIKE');
    }).catch(error => {
      console.log(error);
    })

  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga
   * de permitirle al usuario que creo 
   * una publicacion eliminarla
   *  (solo podra eliminar publicaciones que alla publicado el usuario mas no la de otros usuarios)
   * @param id
   */
  deletePost(id){
    this.firestoreSvc.deleteNotice(id).then(response =>{
      // AGREGAR MENSAJE
      console.log('COLOCAR MENSAJE DE QUE SE A ELIMINADO');
    }).catch(error => {
      console.log(error);
    })
  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que sirve para allar values dentro de un array
   * @param _id
   */
  getKeyObject(_id) {
    return this.notices.map((e) => {
      return e._id;
    }).indexOf(_id);
  }

}
