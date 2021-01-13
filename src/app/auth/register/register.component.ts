import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  messageTextEmail = '';
  messageTextPassword = '';
  message = false;
  messageSuccess = false;
  messageTextSuccess = '';

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga
   * de permitirle a las personas crear
   * un usuario para que posterior a ello pasen a realizar publicaciones
   */
  async onRegister(){
    const {email, password} = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email, password)
      if(typeof user === 'undefined'){
        this.presentMessage()
      } else if (user) {
        await this.authSvc.logout();
        this.presentMessageSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @description mensajes de salida
   */
  presentMessage(){
    this.messageTextEmail = 'valide que la dirección de correo electrónico este bien formateada';
    this.messageTextPassword = 'valide que la contraseña tenga al menos 6 caracteres';
    this.message = true;
    setTimeout(()=> {
      this.message = false;
    }, 5000);
  }


  /**
   * @description mensajes de salida
   */
  presentMessageSuccess(){
    this.registerForm.get('email').setValue('');
    this.registerForm.get('password').setValue('');
    this.messageTextSuccess = 'Registro exitoso, inicie sesión para que empiece a publicar estados!';
    this.messageSuccess = true;
    setTimeout(()=> {
      this.messageSuccess = false;
    }, 5000);
  }

}
