import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    userDataArray: any [] = [];
    formularioActual: any = {}; //aca vamos a guardar el registro que estamos modificando, aca se copian cuando aprietan en modificar
    currentPage: number = 1; //pagina actual
    totalPages: number = 1; //total de paginas
    limit: number = 5; //total de registros por paginas


    constructor( private formularioService: FormularioService){}

    ngOnInit(): void {
      //llamo al servicio
      this.cargarFormularios( this.currentPage ); //carga formularios para la pagina actual
    }

    trackById(index: number, user: any): string {
      return user._id;
    }

    cargarFormularios(page: number):void{
      this.formularioService.getFormularios( page, this.limit).subscribe(
        (response) =>{
          console.log('Datos recibidos:', response);
          this.userDataArray = response.formularios || []; //formulario obtenido
          console.log('Datos en userDataArray:', this.userDataArray);
          this.totalPages = response.totalPages; //total de paginas
          this.currentPage = response.currentPage; //pagina actual
        },
        (error) =>{
          console.error('error al obtener datos', error)
        }
      )
    }
      // Métodos para la paginación
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cargarFormularios(this.currentPage);  // Ir a la siguiente página
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cargarFormularios(this.currentPage);  // Ir a la página anterior
    }
  }

    editarFormulario(user: any): void { // Llenar los campos del formulario con los datos del usuario seleccionado
            this.formularioActual = { ...user };
    }

    guardarCambios(): void {
      if (this.formularioActual._id) {
        this.formularioService.updateFormulario(this.formularioActual._id, this.formularioActual).subscribe(
          (response) => {
            alert('Registro actualizado exitosamente');
            this.formularioActual = {};  // Limpiar el formulario después de guardar
            this.cargarFormularios(this.currentPage);    // Recargar la lista de registros
          },
          (error) => {
            console.error('Error al actualizar el registro:', error);
            alert('Error al actualizar el registro');
          }
        );
        console.log('ID del registro a actualizar:', this.formularioActual._id);
      }
    }


    eliminarFormulario(id: string):void{
      if( confirm('Estas seguro en eliminar el registro?')){
        this.formularioService.deleteFormulario(id).subscribe(
          (response) =>{
            alert('Se elimino el registro')
            this.formularioActual = {};  // Limpiar el formulario después de guardar
            this.cargarFormularios(this.currentPage); //recargo la lista
          }
        )
      }
    }



}

