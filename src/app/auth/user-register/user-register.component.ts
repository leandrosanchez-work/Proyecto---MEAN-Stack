import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerUserForm!: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    this.registerUserForm = this.fb.group({
      nombre:['',Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit():void{
    if(this.registerUserForm.valid){
      this.authService.register(this.registerUserForm.value).subscribe(
        (response) =>{
          alert('Registro exitoso');
          this.router.navigate(['auth/auth'])
          //podemos redirigir al login o a otra ruta
        },
        (error) =>{
          console.error('Error al registrar el usuario', error);
          alert('No se pudo registrar el usuario')
        }
      )
    }
  }
}
