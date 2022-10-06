import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message';
import { MessageList } from '../MessageList';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  userName:string = '';
  message = '';
  socket: any;
  user:string = '';
  online:number = 3;
  toggleCollapse = "collapse";
  flag = true;

  allPreviousMessages: MessageList [] = [];
  messageList: Message [] = [];
  usersJoined = [];
  usersOnline: string [] = [];
  
  time = new Date();
  hour = this.time.getHours();
  minute = this.time.getMinutes();


  constructor(private router: ActivatedRoute) { }

//
  ngOnInit(): void {
    this.userName = this.router.snapshot.params['name'];
    this.user = this.userName;
    //
    this.socket = io.io('https://aqueous-falls-18584.herokuapp.com/');     //http://192.168.29.101:3010   //localhost:3010
    this.socket.emit('new-user-joined', this.userName);

    this.socket.on('user-connected', (name:string) =>{
      this.userJoinedOrLeft(name,"joined");
    })

    this.socket.on('user-disconnected', (name:string) =>{
      this.userJoinedOrLeft(name,"left");
    })

    this.socket.on('user-list', (list:any) => {
      this.usersJoined = list;
      //this.online = Object.keys(this.usersJoined).length;
      this.getOnlineUsersList(list);
    })

    this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
      if(data){
        this.messageList.push({message: data.message, userName: data.userName, mine: false});
      }
    });

    this.socket.on('prev-message-list', (data: any) => {
      this.allPreviousMessages = data;
    });



    
  }

  sendMessage(): void {
    if(this.message != "")
    {
      this.socket.emit('send-message', {message: this.message, userName: this.user});
      this.messageList.push({message: this.message, userName: this.userName, mine: true});
      this.message = '';
    }
  }

  toggleCollapseOnClick() {
    if(this.flag == true){
      this.toggleCollapse = "collapse.show";
      this.flag = !this.flag;
    }
    else{
      this.toggleCollapse = "collapse";
      this.flag = !this.flag;
    }
  }

  userJoinedOrLeft(name:string, status:string){
    
    if(status == "joined"){
      console.log(this.usersJoined);
    }
    else{
      console.log(this.usersJoined);
    }
  }


  getOnlineUsersList(data:any){

    this.usersOnline = [];

    data[Symbol.iterator] = function(){
      let properties = Object.keys(data);
      let count = 0;
      let isDone = false;
      let next = () => {
        if(count>=properties.length){
          isDone = true;
        }
        return{done: isDone, value: this[properties[count++]]};
      }
      return {next};
    };
    for(let dt of data){
      this.usersOnline.push(dt);
    }

    this.online = this.usersOnline.length;

  }



}


























// import { Component, OnInit } from '@angular/core';
// import { io } from 'socket.io-client';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-chat-box',
//   templateUrl: './chat-box.component.html',
//   styleUrls: ['./chat-box.component.css']
// })
// export class ChatBoxComponent implements OnInit {

//   userName:string = '';
//   message = '';
//   socket: any;
//   user:string = '';
//   usersOnline: number = 1;

//   messageList: {message: string, userName: string, mine: boolean} [] = [];
//   userList: string[] = [];

//   constructor(private router: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.userName = this.router.snapshot.params['name'];
//     this.user = this.userName;
    
//     this.socket = io('http://localhost:3010');
    
//     this.socket.emit('set-user-name', this.userName);

//     this.socket.on('user-list', (userList:string[]) => {
//       this.userList = userList;
//     });

//     this.socket.on("connect", () => {
//       this.usersOnline++;
//       //code to add user in userlist and show in view
//     });

//     this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
//       if(data){
//         this.messageList.push({message: data.message, userName: data.userName, mine: false});
//       }
//     });
//   }

//   sendMessage(): void {
//     if(this.message != "")
//     {
//       this.socket.emit('send-message', this.message);
//       this.messageList.push({message: this.message, userName: this.userName, mine: true});
//       this.message = '';
//     }
//   }

// }































// import { Component, OnInit } from '@angular/core';
// import * as io from 'socket.io-client';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-chat-box',
//   templateUrl: './chat-box.component.html',
//   styleUrls: ['./chat-box.component.css']
// })
// export class ChatBoxComponent implements OnInit {

//   userName:string = '';
//   message = '';
//   socket: any;
//   user:string = '';

//   messageList: {message: string, userName: string, mine: boolean} [] = [];
//   userList: string[] = [];

//   constructor(private router: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.userName = this.router.snapshot.params['name'];
//     this.user = this.userName;
    
//     this.socket = io.io('localhost:3010?userName=$name');
    
//     this.socket.emit('set-user-name', this.userName);

//     this.socket.on('user-list', (userList:string[]) => {
//       this.userList = userList;
//     })

//     this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
//       if(data){
//         this.messageList.push({message: data.message, userName: data.userName, mine: false});
//       }
//     });
//   }


  
//   userNameUpdate(name: string)
//   {
//     console.log(name);

//     this.socket = io.io('localhost:3010?userName=$name');
//     this.userName = name;

//     this.socket.emit('set-user-name', name);

//     this.socket.on('user-list', (userList:string[]) => {
//       this.userList = userList;
//     })

//     this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
//       if(data){
//         this.messageList.push({message: data.message, userName: data.userName, mine: false});
//       }
//     });

//   }

//   sendMessage(): void {
//       this.socket.emit('message', this.message);
//       this.messageList.push({message: this.message, userName: this.userName, mine: true});
//       this.message = '';
//   }

// }

