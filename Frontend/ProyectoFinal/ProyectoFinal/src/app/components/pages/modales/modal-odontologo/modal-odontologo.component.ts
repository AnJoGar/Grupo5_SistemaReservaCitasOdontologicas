import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Categoria } from '../../../../interfaces/categoria';
import { Odontologo } from '../../../../interfaces/odontologo';
//import { CategoriaService } from '../../../../services/categoria.service';
import { OdontologoService} from '../../../../servicios/odontologo.service';

@Component({
  selector: 'app-modal-odontologo',
  templateUrl: './modal-odontologo.component.html',
  styleUrls: ['./modal-odontologo.component.css']
})
export class ModalOdontologoComponent {
  formOdontologo: FormGroup;
  accion: string = "Agregar"
  accionBoton: string = "Guardar";
  

  constructor(
    private dialogoReferencia: MatDialogRef<ModalOdontologoComponent>,
    @Inject(MAT_DIALOG_DATA) public odontologoEditar: Odontologo,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    //private _categoriaServicio: CategoriaService,
    private _odontologoServices: OdontologoService
  ) {
    this.formOdontologo = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      experiencia: ['', Validators.required],
      especialidad: ['', Validators.required],
      edad: ['', Validators.required],
      email: ['', Validators.required],
    })


    if (this.odontologoEditar) {

      this.accion = "Editar";
      this.accionBoton = "Actualizar";
    }

   

  }


  ngOnInit(): void {

    if (this.odontologoEditar) {
      console.log(this.odontologoEditar)
      this.formOdontologo.patchValue({
        
        nombre: this.odontologoEditar.nombre,
        apellido: this.odontologoEditar.apellido,
        experiencia: this.odontologoEditar.experienca,
        especialidad: this.odontologoEditar.especialidad,
        edad: this.odontologoEditar.edad,
        email: this.odontologoEditar.email 
        //idCategoria: String(this.pacienteEditar.idCategoria),
        
      })
    }
  }

  agregarEditarOdontologo() {

    const _odontologo: Odontologo = {
      idOdontologo: this.odontologoEditar == null ? 0 : this.odontologoEditar.idOdontologo,
      nombre: this.formOdontologo.value.nombre,
      apellido: this.formOdontologo.value.apellido,
      experienca:this.formOdontologo.value.experienca,
      especialidad: this.formOdontologo.value.especialidad,
      edad : this.formOdontologo.value.edad,    
      email: this.formOdontologo.value.email

    }



    if (this.odontologoEditar) {

      this._odontologoServices.edit(_odontologo).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El odontologo fue editado", "Exito");
            this.dialogoReferencia.close('editado')
          } else {
            this.mostrarAlerta("No se pudo editar el odontologo", "Error");
          }

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
        }
      })


    } else {

      this._odontologoServices.save(_odontologo).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El odontologo fue registrado", "Exito");
            this.dialogoReferencia.close('agregado')
          } else {
            this.mostrarAlerta("No se pudo registrar el odontologo", "Error");
          }

        },
        error: (e) => {
        },
        complete: () => {
        }
      })


    }
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }
}
