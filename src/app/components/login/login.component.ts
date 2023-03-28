import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName :string;
  password : string;
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  login(){

    if(this.userName == "Bubble_Team" && this.password == "1234"){

      localStorage.setItem('userId', '1');
      localStorage.setItem('userName', this.userName);
      this.router.navigate(['/']);

    } else {
      alert('Username or password is incorrect!');
    }
  }
}
