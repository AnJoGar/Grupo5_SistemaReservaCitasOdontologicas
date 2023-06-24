import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalPacienteComponent } from '../modales/modal-paciente/modal-paciente.component';
import { ModalEliminarPacienteComponent} from '../modales/modal-eliminar-paciente/modal-eliminar-paciente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from '../../../interfaces/paciente';

import { PacienteService } from '../../../servicios/paciente.service';
const ELEMENT_DATA: Paciente[] = [
  { 
    idPaciente:1,
    nombre: "Jose",
    apellido:"Taffur" ,
    edad: 15,
    genero: "Masculino",
    direccion:"Playas de villamil",
    telefono: "0923568958",
    email: "sojewim630@aaorsi.com",

  },
  { 
    idPaciente:2,
    nombre: "Janeor",
    apellido:"Loor" ,
    edad: 18,
    genero: "Masculino",
    direccion:"Quito",
    telefono: "0956821793",
    email: "sigado4807@anomgo.com",

  },
  { 
    idPaciente:3,
    nombre: "Jeremy",
    apellido:"Baidal" ,
    edad: 19,
    genero: "Masculino",
    direccion:"Guayaquil",
    telefono: "0937984136",
    email: "bewiwog226@aaorsi.com",

  },
  { 
    idPaciente:4,
    nombre: "Diana",
    apellido:"Ballesteros" ,
    edad: 20,
    genero: "Femenino",
    direccion:"Machala",
    telefono: "0956398756",
    email: "ripotij535@aaorsi.com",

  },
  { 
    idPaciente:5,
    nombre: "Joel",
    apellido:"Coyago" ,
    edad: 20,
    genero: "Masculino",
    direccion:"Guayaquil",
    telefono: "0998756241",
    email: "laxamis711@anomgo.com",

  },
  { 
    idPaciente:6,
    nombre: "David",
    apellido:"Cabanilla" ,
    edad: 25,
    genero: "Masculino",
    direccion:"Machala",
    telefono: "0948569731",
    email: "loxawep957@anomgo.com",

  },
  { 
    idPaciente:7,
    nombre: "Melanie",
    apellido:"Chankay" ,
    edad: 23,
    genero: "Femenina",
    direccion:"EL oro",
    telefono: "0935142678",
    email: "sajac99916@anwarb.com",

  },
  { 
    idPaciente:8,
    nombre: "Josue",
    apellido:"Espinoza" ,
    edad: 27,
    genero: "Masculino",
    direccion:"Playas de villamil",
    telefono: "0978945127",
    email: "dohanim787@aaorsi.com",

  },
  { 
    idPaciente:9,
    nombre: "Franco",
    apellido:"Floreano" ,
    edad: 30,
    genero: "Masculino",
    direccion:"Quito",
    telefono: "0974187623",
    email: "sicen19365@anomgo.com",

  },

];
@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit, AfterViewInit  {
  
  displayedColumns: string[] = ['idPaciente','nombre', 'apellido', 'edad', 'genero','direccion','telefono', 'email', 'acciones','acc'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _pacienteServicio: PacienteService
  ) {

  }

  ngOnInit(): void {
    this.mostrarPaciente();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarPaciente() {
    this._pacienteServicio.getPaciente().subscribe({
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


  agregarPaciente() {
    this.dialog.open(ModalPacienteComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "agregado") {
        this.mostrarPaciente();
      }
    });
  }

  editarPaciente(paciente: Paciente) {
    this.dialog.open(ModalPacienteComponent, {
      disableClose: true,
      data: paciente
    }).afterClosed().subscribe(result => {

      if (result === "editado")
        this.mostrarPaciente();

    });
  }


  eliminarPaciente(paciente: Paciente) {
    this.dialog.open(ModalPacienteComponent, {
      disableClose: true,
      data: paciente
    }).afterClosed().subscribe(result => {

      if (result === "eliminar") {

        this._pacienteServicio.delete(paciente.idPaciente).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta("El producto fue eliminado", "Listo!")
              this.mostrarPaciente();
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
