import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '../../../../interfaces/rol';
import { Usuario } from '../../../../interfaces/usuario';

import { UsuarioService} from '../../../../servicios/usuario.service';
import { RolService } from '../../../../servicios/rol.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit, AfterViewInit {

  formUsuario: FormGroup;
  hide: boolean = true;
  accion:string ="Agregar"
  accionBoton: string = "Guardar";
  listaRoles: Rol[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuarioEditar: Usuario,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _rolServicio:  RolService,
    private _usuarioServicio: UsuarioService
  )
  {

    this.formUsuario = this.fb.group({
      nombreApellido: ['', Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+')],
      correo: ['', Validators.required],
      idRol: ['', Validators.required],
      clave: ['', Validators.required],
      //cambio para datos quemados
    rolDescripcion:  ['', Validators.required]
    })


    if (this.usuarioEditar) {
      this.accion = "Editar";
      this.accionBoton = "Actualizar";
    }

    this._rolServicio.getRoles().subscribe({
      next: (data) => {

        if (data.status) {

          this.listaRoles = data.value;

          if (this.usuarioEditar)
            this.formUsuario.patchValue({
              idRol: this.usuarioEditar.idRol
            })

        }
      },
      error: (e) => {
      },
      complete: () => {
      }
    })


  }

  ngOnInit(): void {
  
    if (this.usuarioEditar) {

      this.formUsuario.patchValue({
        nombreApellido: this.usuarioEditar.nombreApellidos,
        correo: this.usuarioEditar.correo,
        idRol: this.usuarioEditar.idRol,
        clave:this.usuarioEditar.clave,


        //cambio para datos quemados

        rolDescripcion:this.usuarioEditar.rolDescripcion
       // esActivo: this.usuarioEditar.
      
      // rolDescripcion : "",
        //clave: this.usuarioEditar.clave
      })
    }

  }

  ngAfterViewInit() {
    
  }


  agregarEditarUsuario() {
 

    const _usuario: Usuario = {
      idUsuario: this.usuarioEditar == null ? 0 : this.usuarioEditar.idUsuario,
      nombreApellidos: this.formUsuario.value.nombreApellido,
      correo: this.formUsuario.value.correo,
      idRol: this.formUsuario.value.idRol,
    //  rolDescripcion : "",
    
    //cambio para datos quemados
     rolDescripcion:this.usuarioEditar.rolDescripcion,
      clave: this.formUsuario.value.clave
    }


    if (this.usuarioEditar) {

      this._usuarioServicio.editUsuario(_usuario).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El usuario fue editado", "Exito");
            this.dialogoReferencia.close('editado')
          } else {
            this.mostrarAlerta("No se pudo editar el usuario", "Error");
          }

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
        }
      })

      
    } else {

      this._usuarioServicio.saveUsuario(_usuario).subscribe({
        next: (data) => {

          if (data.status) {
            this.mostrarAlerta("El usuario fue registrado", "Exito");
            this.dialogoReferencia.close('agregado')
          } else {
            this.mostrarAlerta("No se pudo registrar el usuario", "Error");
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
