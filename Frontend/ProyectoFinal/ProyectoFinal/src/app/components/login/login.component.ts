
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
//import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioComponent } from 'src/app/components/pages/usuario/usuario.component';
import{Login} from 'src/app/interfaces/login';
import{RolNavegacionService} from 'src/app/servicios/rol-navegacion.service';

import { ModalUsuarioComponent } from 'src/app/components/pages/modales/modal-usuario/modal-usuario.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  formLogin: FormGroup;
  hidePassword:boolean   = true;
  loading: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _rolNavegacion: RolNavegacionService
  ) {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.loading = true;

    const correo = this.formLogin.value.email;
    const clave = this.formLogin.value.password;
    if (correo === "1" && clave === "1") {
      // Credenciales válidas, realizar el inicio de sesión
      this.router.navigate(['pages']);
      //this.router.navigate(['pages/odontologo']); // Redirigir a la página de dashboard o la que corresponda
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      this.mostrarAlerta("Credenciales inválidas", "Error");
      this.loading = false;
    }

    
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
          this.agregarUsuario();
        }
      });
  }

agregar(){
  const dialogRef = this.dialog.open(ModalUsuarioComponent, {
    disableClose: true,
    data: {
      // Pasar los datos necesarios al componente ModalUsuarioComponent
    }
  });

  dialogRef.componentInstance.agregarEditarUsuario();
}

mostrarUsuarios() {
  this._usuarioServicio.getUsuarios();
}



onLogin2() {
  this.loading = true;

  const correo = this.formLogin.value.email;
  const clave = this.formLogin.value.password;

  this._usuarioServicio.getIniciarSesion(correo, clave).subscribe({
    next: (data) => {
     
      if (data.status) {
        this._rolNavegacion.guardarSesionUsuario(data.value);
        this.router.navigate(['pages'])
      } else {
        this._snackBar.open("No se encontraron coincidencias", 'Oops!', { duration: 3000 });
      }
      
    },
    error: (e) => {
      this._snackBar.open("hubo un error", 'Oops!', { duration:3000 });
    },
    complete: () => {
      this.loading = false;
    }
  })
}
}
