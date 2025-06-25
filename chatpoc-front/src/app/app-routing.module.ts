import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ChatComponent } from './component/chat/chat.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'chat/:roomId', component: ChatComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
