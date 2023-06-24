
import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalOdontologoComponent } from '../modales/modal-odontologo/modal-odontologo.component';
import { ModalEliminarOdontologoComponent } from '../modales/modal-eliminar-odontologo/modal-eliminar-odontologo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Odontologo } from '../../../interfaces/odontologo';
import { OdontologoService } from '../../../servicios/odontologo.service';


const ELEMENT_DATA: Odontologo[] = [
  { 
   
  idOdontologo:1,
  nombre: "Eliana",
  apellido: "Sanchez",
  experienca: 7,
  especialidad: "Endodoncia",
  edad: 40,
  email: "temiyo5751@aaorsi.com"

  },
  { 
   
    idOdontologo:2,
    nombre: "Marco",
    apellido: "Salazar",
    experienca: 10,
    especialidad: "Ortodoncia",
    edad: 45,
    email: "yojareb508@anwarb.com"
  
  },
  { 
   
    idOdontologo:3,
    nombre: "Anderson",
    apellido: "Rubin",
    experienca: 11,
    especialidad: "Protesis Dental",
    edad: 48,
    email: "tavapow943@aaorsi.com"
  
  },
  { 
   
    idOdontologo:4,
    nombre: "Melany",
    apellido: "Solis",
    experienca: 8,
    especialidad: "Medicina Bucal",
    edad: 38,
    email: "vivoh90495@aaorsi.com"
  
  },
  { 
   
    idOdontologo:5,
    nombre: "Xavier",
    apellido: "Rodriguez",
    experienca: 15,
    especialidad: "Cirugia Oral",
    edad: 49,
    email: "xesikar941@anomgo.com"
  
  }
];
@Component({
  selector: 'app-odontologo',
  templateUrl: './odontologo.component.html',
  styleUrls: ['./odontologo.component.css']
})





export class OdontologoComponent {
  displayedColumns: string[] = ['idOdontologo','nombre', 'apellido', 'experienca', 'especialidad','edad', 'email', 'acciones','acc'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _odontologoServicio: OdontologoService
  ) {

  }

  
  ngOnInit(): void {
    this.mostrarOdontologo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarOdontologo() {
    this._odontologoServicio.getOdontologo().subscribe({
      next: (data) => {
        if (data.status)
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


  agregarOdontologo() {
    this.dialog.open(ModalOdontologoComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "agregado") {
        this.mostrarOdontologo();
      }
    });
  }

  editarOdontologo(odontologo: Odontologo) {
    this.dialog.open(ModalOdontologoComponent, {
      disableClose: true,
      data: odontologo
    }).afterClosed().subscribe(result => {

      if (result === "editado")
        this.mostrarOdontologo();

    });
  }


  eliminarOdontologo(odontologo: Odontologo) {
    this.dialog.open(ModalEliminarOdontologoComponent, {
      disableClose: true,
      data: odontologo
    }).afterClosed().subscribe(result => {

      if (result === "eliminar") {

        this._odontologoServicio.delete(odontologo.idOdontologo).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta("El producto fue eliminado", "Listo!")
              this.mostrarOdontologo();
            } else {
              this.mostrarAlerta("No se pudo eliminar el producto", "Error");
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

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });



    

}










}
