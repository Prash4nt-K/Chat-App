import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { UserNameComponent } from './user-name/user-name.component';

const routes: Routes = [
  {path: '', component: UserNameComponent},
  {path: 'chatBox/:name', component: ChatBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
