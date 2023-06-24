import { Component, OnInit,AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalServicioComponent} from '../modales/modal-servicio/modal-servicio.component';
import { ModalEliminarServicioComponent} from '../modales/modal-eliminar-servicio/modal-eliminar-servicio.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Servicio } from '../../../interfaces/servicio';
import { ServiciosService } from '../../../servicios/servicios.service';

const ELEMENT_DATA: Servicio[] = [
  {
    idServicio:1,
    nombreServicio:'Endodoncia',
    precio:'180'
},

{
  idServicio:2,
  nombreServicio:'Ortodoncia',
  precio:'700'
},
{
  idServicio:3,
  nombreServicio:'Protesis Dental',
  precio:'600'
},
{
  idServicio:4,
  nombreServicio:'Medicina Bucal',
  precio:'40'
},
{
  idServicio:5,
  nombreServicio:'Cirugia Oral',
  precio:'120'
}


  //{ idUsuario: 3, nombreApellidos: "yamile pinto", correo: "yamile@gmail.com", idRol: 2, rolDescripcion: "Empleado",clave:"6788"},

];
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent  implements OnInit, AfterViewInit{


  displayedColumns: string[] = ['idServicio','nombre', 'precio', 'editar','eliminar'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _Servicio: ServiciosService
  )
  {
    
  }

  ngOnInit(): void {
    this.mostrarServicio();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarServicio() {
    this._Servicio.getServicio().subscribe({
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

  agregarServicio() {
    this.dialog.open(ModalServicioComponent, {
        disableClose: true
      }).afterClosed().subscribe(result => {
        
        if (result === "agregado") {
          this.mostrarServicio();
        }
      });
  }

  editarServicio(servicio: Servicio) {
    this.dialog.open(ModalServicioComponent, {
      disableClose: true,
      data: servicio
    }).afterClosed().subscribe(result => {
      
      if (result === "editado")
        this.mostrarServicio();

    });
  }

  eliminarServicio(servicio: Servicio) {
    this.dialog.open(ModalEliminarServicioComponent, {
      disableClose: true,
      data: servicio
    }).afterClosed().subscribe(result => {
      
      if (result === "eliminar") {

        this._Servicio.delete(servicio.idServicio).subscribe({
          next: (data) => {

            if (data.status) {
              this.mostrarAlerta("El servicio fue eliminado", "Listo!")
              this.mostrarServicio();
            } else {
              this.mostrarAlerta("No se pudo eliminar el servicio", "Error");
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












}
