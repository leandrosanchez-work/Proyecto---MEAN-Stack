import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../../services/formulario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor( private fb: FormBuilder, private FormularioService: FormularioService){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(6)]],
      edad: ['', [Validators.required, Validators.min(18)]],
      hijos: this.fb.group({
        tieneHijos: ['', Validators.required],
        cantidad: [{ value: '', disabled: true }, Validators.required]  // Cantidad inicialmente deshabilitado
      })
    });

    // Habilitar/deshabilitar el campo "Cantidad de hijos" según la selección
    this.registerForm.get('hijos')?.get('tieneHijos')?.valueChanges.subscribe((value) => {
      if (value === 'si') {
        this.registerForm.get('hijos')?.get('cantidad')?.enable();//habilitaa el campo
      } else {
        this.registerForm.get('hijos')?.get('cantidad')?.disable();//Queda deshabilitado
        this.registerForm.get('hijos')?.get('cantidad')?.reset();  // Limpiar el campo si es "No"
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value; //Recibo los datos del form

      //utilizo servicio para guardar el form
      this.FormularioService.addFormulario(formData).subscribe(
        (response) =>{
          console.log('Formulario guardado con exito: ', response)
          alert('El registro se envio a base de datos')
        },
        (error) =>{
          console.error('Error al guardar el formulario: ', error)
          alert('Se produjo un error al guardar el formulario');
        }
      );





     /* asi guardaba en localstorage
      let dataArray = JSON.parse(localStorage.getItem('userDataArray') || '[]'); //Obtengo los registros anteriores

      if (dataArray.length >= 3) {
        dataArray.shift();  // Eliminar el registro más antiguo
      }

      dataArray.push(formData); //Agrego al array
      localStorage.setItem('userDataArray', JSON.stringify(dataArray));//Guardo

      alert('Datos guardados correctamente');*/
    }
  }
}


