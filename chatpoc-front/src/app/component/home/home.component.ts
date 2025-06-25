import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  author: string = '';
  role: string = 'client';
  rooms: string[] = ['Room 1', 'Room 2', 'Room 3'];

  constructor(private router: Router) {}

  joinRoom(roomId: string) {
    if (!this.author || !this.role) {
      alert('Merci de remplir votre nom et de choisir un rôle.');
      return;
    }

    this.router.navigate(['/chat', roomId], {
      queryParams: {
        author: this.author,
        role: this.role
      }
    });
  }
}
