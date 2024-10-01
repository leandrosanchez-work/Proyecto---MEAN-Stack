import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:  FormGroup

  loading: boolean = false;
  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      nombre:[''],
      email: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    const token = localStorage.getItem('token');
    console.log('Token JWT:', token); // Muestra el token en la consola
  }

  onSubmit() {
    console.log(this.loginForm); // Ver el estado completo del formulario
  console.log(this.loginForm.get('email')?.errors); // Ver errores específicos del email
  console.log(this.loginForm.get('password')?.errors); // Ver errores específicos de la contraseña
    if (this.loginForm.valid) {
      console.log('Enviando solicitud de inicio de sesión...');

      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          if (response.token) {
            alert('Usuario Correcto');
            localStorage.setItem('token', response.token);
            this.router.navigate(['/auth/auth']); // Redirige a la página auth
          } else {
            alert('No se recibió el token.');
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          if (error.status === 400) {
            // Mostrar mensaje de error según el tipo de error devuelto
            if (error.error.message === 'Usuario no encontrado') {
              alert('El correo electrónico no está registrado.');
            } else if (error.error.message === 'Contraseña incorrecta') {
              alert('La contraseña ingresada es incorrecta.');
            } else {
              alert('Error al iniciar sesión: ' + error.error.message);
            }
          } else if (error.status === 500) {
            alert('Error del servidor, por favor intenta más tarde.');
          } else {
            alert('Error inesperado, revisa la consola para más detalles.');
          }
        }
      );
    } else {
      console.log('Formulario inválido.');
    }
  }

}
