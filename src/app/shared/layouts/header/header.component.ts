import { Component } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { User } from '../../../core/types/userTypes';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  loggedUser : User | null = null;

  constructor(private tokenService : TokenService, private authService : AuthService){
    tokenService.loggedUser$.subscribe((user) => {
      if(user){
        this.loggedUser = user;
      }
    })
  }

  onLogout(){
    this.authService.onLogout();
  }

}
