import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleCita } from '../../../interfaces/detalle-cita';
import { Paciente } from '../../../interfaces/paciente';
import { Odontologo } from '../../../interfaces/odontologo';
import { Cita } from '../../../interfaces/cita';
import { Servicio } from '../../../interfaces/servicio';
import { MatPaginator } from '@angular/material/paginator';
import { PacienteService } from '../../../servicios/paciente.service';
import { ServiciosService } from '../../../servicios/servicios.service';
import { OdontologoService } from '../../../servicios/odontologo.service';
import { CitaService } from '../../../servicios/cita.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCitaComponent } from '../modales/modal-cita/modal-cita.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    dateTimeInput: 'DD/MM/YYYY HH:mm'
  },
};


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class CitaComponent implements OnInit  {


  ELEMENT_DATA2: Cita[] = [

  ];

  options: Paciente[] = [];
  options2: Servicio[] = [];
  options3: Odontologo[] = [];
   ELEMENT_DATA: DetalleCita[] = [
   
    {   
      "idCita": 1,
      "idPaciente": 2,
      "idOdontologo": 2,
      "idServicio": 2,
      "descripcionPaciente": "Jose Taffur",
      "descripcionOdontologo": "Eliana Sanchez",
      "servicio": "Endodoncia",
      "fechaReserva": "25/07/2023",
      "precioTexto": "180",
   //   "totalTexto": "string"
  },
      {   
        "idCita": 2,
        "idPaciente": 3,
        "idOdontologo": 3,
        "idServicio": 3,
        "descripcionPaciente": "Janeor Loor",
        "descripcionOdontologo": "Anderson Rubin",
        "servicio": "Protesis Dental",
        "fechaReserva": "27/07/2023",
        "precioTexto": "600",
       // "totalTexto": "string"
      },
      {   
        "idCita": 3,
        "idPaciente": 4,
        "idOdontologo": 4,
        "idServicio": 4,
        "descripcionPaciente": "Jeremy Baidal",
        "descripcionOdontologo": "Marco Salazar",
        "servicio": "Ortodoncia",
        "fechaReserva": "02/08/2023",
        "precioTexto": "700",
       // "totalTexto": "string"
      }, 
      {   
        "idCita": 4,
        "idPaciente": 5,
        "idOdontologo": 5,
        "idServicio": 5,
        "descripcionPaciente": "Diana Ballesteros",
        "descripcionOdontologo": "Anderson Rubin",
        "servicio": "Protesis Dental",
        "fechaReserva": "04/08/2023",
        "precioTexto": "600",
       // "totalTexto": "string"
      },
      {   
        "idCita": 5,
        "idPaciente": 6,
        "idOdontologo": 6,
        "idServicio": 6,
        "descripcionPaciente": "Joel Coyago",
        "descripcionOdontologo": "Marco Salazar",
        "servicio": "Ortodoncia",
        "fechaReserva": "07/08/2023",
        "precioTexto": "700",
       // "totalTexto": "string"
      }, 
      {   
        "idCita": 6,
        "idPaciente": 7,
        "idOdontologo": 7,
        "idServicio": 7,
        "descripcionPaciente": "David Cabanilla",
        "descripcionOdontologo": "Melany Solis",
        "servicio": "Medicina Bucal",
        "fechaReserva": "09/08/2023",
        "precioTexto": "40",
       // "totalTexto": "string"
      }, 
      {   
        "idCita": 7,
        "idPaciente": 8,
        "idOdontologo": 8,
        "idServicio": 8,
        "descripcionPaciente": "Melanie Chankay",
        "descripcionOdontologo": "Eliana Sanchez",
        "servicio": "Endodoncia",
        "fechaReserva": "11/08/2023",
        "precioTexto": "180",
     //   "totalTexto": "string"
    },
    {   
      "idCita": 8,
      "idPaciente": 9,
      "idOdontologo": 9,
      "idServicio": 9,
      "descripcionPaciente": "Josue Espinoza",
      "descripcionOdontologo": "Anderson Rubin",
      "servicio": "Protesis Dental",
      "fechaReserva": "14/08/2023",
      "precioTexto": "600",
     // "totalTexto": "string"
    },
    {   
      "idCita": 9,
      "idPaciente": 10,
      "idOdontologo": 10,
      "idServicio": 10,
      "descripcionPaciente": "Franco Floreano",
      "descripcionOdontologo": "Xavier Rodriguez",
      "servicio": "Cirugia Oral",
      "fechaReserva": "16/08/2023",
      "precioTexto": "120",
   //   "totalTexto": "string"
  },
  

  ];


  deshabilitado: boolean = false;

  filteredPacientes!: Paciente[];
  filteredServicios!: Servicio[];
  filteredOdontologo!: Odontologo[];
  agregarPaciente!: Paciente;
  agregarCita!: DetalleCita;
  citaEditada: DetalleCita | null = null;
  agregarServicio!: Servicio ;
  agregarOdontologo!: Odontologo ;
  fechaReserva: string = "";
 // totalPagar: number = 0;
  

 //'total'
  formGroup: FormGroup;
  displayedColumns: string[] = ['idCita','paciente', 'servicio','odontologo','fechaReserva', 'precio','accion'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private fb: FormBuilder,
    private _pacienteServicio: PacienteService,
    private _citaServicio: CitaService,
    private _odontologoServicio: OdontologoService,
    private _servicioServicio:ServiciosService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.formGroup = this.fb.group({
      paciente: ['', Validators.required],
      servicio: ['', Validators.required],
      odontologo: ['', Validators.required],
     
      fechaReserva: {
        type: String,
        format: 'YYYY-MM-DD',
        required: true,
      }
     
      
    })

    this.formGroup.get('paciente')?.valueChanges.subscribe(value => {
      this.filteredPacientes =  this._filter(value)
    })

    this.formGroup.get('servicio')?.valueChanges.subscribe(value => {
      this.filteredServicios =  this._filterS(value)
    })

    this.formGroup.get('odontologo')?.valueChanges.subscribe(value => {
      this.filteredOdontologo =  this._filterO(value)
    })


    this._pacienteServicio.getPaciente().subscribe({
      next: (data) => {
        if (data.status)
          this.options = data.value;
      },
      error: (e) => {
      },
      complete: () => {

      }
    })

    
    this._servicioServicio.getServicio().subscribe({
      next: (data) => {
        if (data.status)
          this.options = data.value;
      },
      error: (e) => {
      },
      complete: () => {

      }
    })

    this._odontologoServicio.getOdontologo().subscribe({
      next: (data) => {
        if (data.status)
          this.options = data.value;
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  }

  
  
  //ngOnInit(): void {
    //this.dataSource.data = this.ELEMENT_DATA; // Asignar los datos a dataSource
    //this.dataSource.paginator = this.paginator;
  //}

  ngOnInit(): void {

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

  mostrarServicio() {
    this._servicioServicio.getServicio().subscribe({
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


  displayPaciente(paciente: Paciente): string {
    return paciente.apellido;
  }
  displayServicio(servicio: Servicio): string {
    return servicio.nombreServicio;
  }
  displayOdontologo(odontologo: Odontologo): string {
    return odontologo.apellido;
  }
 

  pacienteSeleccionado(event: any) {
    this.agregarPaciente = event.option.value;
  }


  
  servicioSeleccionado(event: any) {
    this.agregarPaciente = event.option.value;
  }
  
  odontologoSeleccionado(event: any) {
    this.agregarPaciente = event.option.value;
  }




  onSubmitForm() {
    const _cantidad: number = this.formGroup.value.cantidad;
  
    const _precio: number = parseFloat(this.agregarServicio.precio);
    //const _total:number= _precio;
    

    this.ELEMENT_DATA.push(
      {

        
         
        idCita: this.agregarCita.idCita,
        idPaciente: this.agregarPaciente.idPaciente,
        idOdontologo: this.agregarOdontologo.idOdontologo,
        idServicio: this.agregarServicio.idServicio,
        descripcionPaciente: this.agregarPaciente.apellido,
        descripcionOdontologo: this.agregarOdontologo.apellido,
        servicio: this.agregarServicio.nombreServicio,
        fechaReserva:this.agregarCita.fechaReserva,
        precioTexto: this.agregarServicio.precio,
        //totalTexto: 'string'
        
    
      })
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.formGroup.patchValue({
      paciente: '',

      servicio: '',
      odontologo:'',
      fechaReserva:''
    })
   
  }


  editarOdontologo(odontologo: Odontologo) {
 
  }


  eliminarPaciente(item: DetalleCita) {
   
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(p => p.idPaciente != item.idPaciente),
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(p => p.idOdontologo != item.idOdontologo),
    this.ELEMENT_DATA = this.ELEMENT_DATA.filter(p => p.idServicio != item.idServicio),
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });



  }

  private _filter(value: any): Paciente[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.apellido.toLowerCase();
    return this.options.filter(option => option.apellido.toLowerCase().includes(filterValue));
  }
  private _filterS(value: any): Servicio[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.nombreServicio.toLowerCase();
    return this.options2.filter(options => options.nombreServicio.toLowerCase().includes(filterValue));
  }

  private _filterO(value: any): Odontologo[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.apellido.toLowerCase();
    return this.options3.filter(options => options.apellido.toLowerCase().includes(filterValue));
  }


  registrarCita() {

    if (this.ELEMENT_DATA.length > 0) {

      this.deshabilitado = true;
      

      const ventaDto: Cita = {
        fechaReserva: this.fechaReserva,
       // totalTexto: String(this.totalPagar.toFixed(2)),
        DetalleCita: this.ELEMENT_DATA
      }

      this._citaServicio.registrar(ventaDto).subscribe({
        next: (data) => {

          if (data.status) {
           // this.totalPagar = 0.00;
            this.ELEMENT_DATA = [];
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
           // this.tipoPago = "";

            this.dialog.open(ModalCitaComponent, {
              data: {
                numero: data.value.numeroDocumento
              },
            });

          } else {
            this._snackBar.open("No se pudo registrar la cita", "Oops", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000
            });
          }
        },
        error: (e) => {
        },
        complete: () => {
          this.deshabilitado = false;
        }
      })


    }
  }
  editRow(row: DetalleCita) {
    this.citaEditada = row;
    this.formGroup.patchValue({
      paciente: row.idPaciente,
      servicio: row.idServicio
    });
  }

 editarCita(item: DetalleCita) {
    const primerCita = 
    this.formGroup.patchValue({
      idCita:item.idCita,
    servicio: item.servicio,
    paciente:item.descripcionPaciente,
   odontologo:item.descripcionOdontologo,
    fechaReserva:item.fechaReserva,
    precio:item.precioTexto
    });
  }
 
  cargarDatosQuemados() {
    const primerCita = this.ELEMENT_DATA[1]; // Obtén el primer elemento de tu arreglo de datos quemados
  
    // Asigna los valores a los campos de entrada
    this.formGroup.patchValue({
      
      paciente: primerCita.descripcionPaciente,
      servicio: primerCita.servicio,
      odontologo:primerCita.descripcionOdontologo,
      fechaReserva: primerCita.fechaReserva
    });
  }
  
  actualizarEstudiante(estudiante:DetalleCita){
    console.log(estudiante);
    this.ELEMENT_DATA;

  }
  registrarCita2() {
    if (this.ELEMENT_DATA.length > 1){
      this.deshabilitado = true;
      const ventaDto: Cita = {
       // tipoPago: this.tipoPago,
       // totalTexto: String(this.totalPagar.toFixed(2)),
        DetalleCita: this.ELEMENT_DATA
      }
  // this.totalPagar = 0.00;
  this.ELEMENT_DATA = [];
  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
 // this.tipoPago = "";

  this.dialog.open(ModalCitaComponent, {
    data: {
      //numero: data.value.numeroDocumento
    },
  });

    }

   


    

  }

  loadObjectIntoForm(selectedObject: any) {
    this.formGroup.patchValue({
      paciente: selectedObject.descripcionPaciente,
      descripcionOdontologo: selectedObject.descripcionOdontologo,
      servicio: selectedObject.servicio,
      fechaReserva: selectedObject.fechaReserva
    });
  }
  
}