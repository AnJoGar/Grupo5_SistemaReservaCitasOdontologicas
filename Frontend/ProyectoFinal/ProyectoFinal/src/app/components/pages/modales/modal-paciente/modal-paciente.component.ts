import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { Categoria } from '../../../../interfaces/categoria';
import { Paciente } from '../../../../interfaces/paciente';
//import { CategoriaService } from '../../../../services/categoria.service';
import { PacienteService} from '../../../../servicios/paciente.service';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.css']
})
export class ModalPacienteComponent implements OnInit {
  formPaciente: FormGroup;
  accion: string = "Agregar"
  accionBoton: string = "Guardar";
  genero: string[] = ['Masculino', 'Femenino'];

  

  constructor(
    private dialogoReferencia: MatDialogRef<ModalPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public pacienteEditar: Paciente,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    //private _categoriaServicio: CategoriaService,
    private _pacienteServices: PacienteService
  ) {
    this.formPaciente = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
     
    })


    if (this.pacienteEditar) {

      this.accion = "Editar";
      this.accionBoton = "Actualizar";
    }

   

  }


  ngOnInit(): void {

    if (this.pacienteEditar) {
      console.log(this.pacienteEditar)
      this.formPaciente.patchValue({
        
        nombre: this.pacienteEditar.nombre,
        apellido: this.pacienteEditar.apellido,
        edad: this.pacienteEditar.edad,
        genero: this.pacienteEditar.genero,
        direccion: this.pacienteEditar.direccion,
        telefono: this.pacienteEditar.telefono,
        email: this.pacienteEditar.email 
        //idCategoria: String(this.pacienteEditar.idCategoria),
        
      })
    }
  }

  agregarEditarPaciente() {

    const _paciente: Paciente = {
      idPaciente: this.pacienteEditar == null ? 0 : this.pacienteEditar.idPaciente,
      nombre: this.formPaciente.value.nombre,
      apellido: this.formPaciente.value.apellido,
      edad:this.formPaciente.value.edad,
      genero: this.formPaciente.value.genero,
      direccion : this.formPaciente.value.direccion,
      telefono: this.formPaciente.value.telefono,
      email: this.formPaciente.value.email

    }



    if (this.pacienteEditar) {

      this._pacienteServices.edit(_paciente).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El producto fue editado", "Exito");
            this.dialogoReferencia.close('editado')
          } else {
            this.mostrarAlerta("No se pudo editar el producto", "Error");
          }

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
        }
      })


    } else {

      this._pacienteServices.save(_paciente).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El producto fue registrado", "Exito");
            this.dialogoReferencia.close('agregado')
          } else {
            this.mostrarAlerta("No se pudo registrar el producto", "Error");
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
