
import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../../servicios/usuario.service';
import { ModalUsuarioComponent } from '../modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../interfaces/usuario';
import { ModalEliminarUsuarioComponent } from '../modales/modal-eliminar-usuario/modal-eliminar-usuario.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Title } from 'chart.js';
const ELEMENT_DATA: Usuario[] = [
  { idUsuario: 1, nombreApellidos: "Aquiles Cuesta", correo: "Aquiles@gmail.com", idRol: 1,rolDescripcion:"Administrador",clave:"1233"},
  { idUsuario: 2, nombreApellidos: "Napoleon Bonaparte", correo: "Napoleo@gmail.com", idRol: 2, rolDescripcion: "Empleado",clave:"4566"},

  //{ idUsuario: 3, nombreApellidos: "yamile pinto", correo: "yamile@gmail.com", idRol: 2, rolDescripcion: "Empleado",clave:"6788"},

];


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent  implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['idUsuario','nombreApellidos', 'correo', 'rolDescripcion','acciones','acc'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioService
  )
  {
    
  }

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarUsuarios() {
    this._usuarioServicio.getUsuarios().subscribe({
      next: (data) => {
        if(data.status)
          this.dataSource.data = data.value;
        else
          this._snackBar.open("No se encontraron datos", 'Oops!', { duration: 2000 });
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  }

 
  mostrarAlerta(mensaje:string,tipo:string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }

  agregarUsuario() {
    this.dialog.open(ModalUsuarioComponent, {
        disableClose: true
      }).afterClosed().subscribe(result => {
        
        if (result === "agregado") {
          this.mostrarUsuarios();
        }
      });
  }

  editarUsuario(usuario: Usuario) {
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(result => {
      
      if (result === "editado")
        this.mostrarUsuarios();

    });
  }

  eliminarUsuario(usuario: Usuario) {
    this.dialog.open(ModalEliminarUsuarioComponent, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(result => {
      
      if (result === "eliminar") {

        this._usuarioServicio.deleteUsuario(usuario.idUsuario).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta("El usuario fue eliminado", "Listo!")
              this.mostrarUsuarios();
            } else {
              this.mostrarAlerta("No se pudo eliminar el usuario", "Error");
            }

          },
          error: (e) => {
          },
          complete: () => {
          }
        })

      }
        

    });
  }

  eliminarU(usuario:Usuario){
Swal.fire({
  title:"Desea eliminar el usuario",
  text:usuario.nombreApellidos,
  icon:'warning',
  confirmButtonColor:'#3085d6',
showCancelButton:true,
cancelButtonColor: '#3085d6',

}).then(result => {

  if(result.isConfirmed)

  this._usuarioServicio.deleteUsuario(usuario.idUsuario).subscribe({
    next: (data) =>{

      if (data.status) {
        this.mostrarAlerta("El usuario fue eliminado", "Listo!")
        this.mostrarUsuarios();
      } else {
        this.mostrarAlerta("No se pudo eliminar el usuario", "Error");
      }

    },
      error: (e) => {}



    })
    
 
  })
  }



}

