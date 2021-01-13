import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService]
})
export class NavbarComponent {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc:AuthService, private router:Router) { 
  }



  /**
   * @author Luis Hernandez
   * @description Metodo que sirve 
   * para aplicar funcionalidad de 
   * menu(items) en modo responsivo
   */
  responsiveMenu() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  

  /**
   * @author Luis Fernando Hernandez
   * @description Metodo que ayuda al usuario cerrar la sesión
   */
  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
      sessionStorage.clear();
    } catch (error) {
      console.log(error)
    }
    
  }

}
