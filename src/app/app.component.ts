import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto-Forms-Reactive';

  constructor( public router: Router){ }

 // Mostrar el navbar solo en login y register
 mostrarNavbar(): boolean {
  // Mostrar el navbar solo en login y register
  const rutasConNavbar = ['/register/register','/login/login' ];
  return rutasConNavbar.includes(this.router.url);
}

// Mostrar el sidebar en el resto de rutas
mostrarSidebar(): boolean {
  console.log('Current URL:', this.router.url);
  // Rutas donde no quieres que aparezca el sidebar
  const rutasSinSidebar = ['/login/login', '/register/register'];

  // Oculta el sidebar si la URL actual está en la lista de rutas donde no debería aparecer
  return !rutasSinSidebar.includes(this.router.url);

}
}
