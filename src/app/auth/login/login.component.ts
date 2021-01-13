import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  message = false;
  messageText = '';


  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga
   * de llamar el servicio de logeo acceder al sistema
   */
  async onLogin(){
    const {email, password} = this.loginForm.value;
    try {
      const user =  await this.authSvc.login(email, password)
      if(typeof user === 'undefined'){
        this.presentMessage()
      } else if (user) {
        sessionStorage.setItem('accessToken', JSON.stringify(user.user.refreshToken));
        sessionStorage.setItem('dataSesion', JSON.stringify({uid: user.user.uid, email:user.user.email}));
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que se encarga
   * de mostrarle al usuario si esta ingresando los datos mal
   */
  presentMessage(){
    this.messageText = 'Datos erroneos';
    this.message = true;
    setTimeout(()=> {
      this.message = false;
    }, 2000);

  }

}
