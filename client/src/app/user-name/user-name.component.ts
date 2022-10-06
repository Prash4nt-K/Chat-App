import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.css']
})
export class UserNameComponent implements OnInit {

  userName: string = '';
  smallName = false;
  socket: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  validate() {
    if(this.userName.length < 4) 
    {
      this.smallName = true;
      this.userName = "";
    }
    else{
      this.router.navigate(['chatBox', this.userName]);
    }
  }

}
