import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { ReusableModule } from '../reusable/reusable.module';
import { PagesComponent } from './pages.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ModalUsuarioComponent } from './modales/modal-usuario/modal-usuario.component';
import { PacienteComponent } from './paciente/paciente.component';
import { OdontologoComponent } from './odontologo/odontologo.component';
import { ServicioComponent } from './servicio/servicio.component';
import { CitaComponent } from './cita/cita.component';
import { ModalPacienteComponent } from './modales/modal-paciente/modal-paciente.component';
import { ModalOdontologoComponent } from './modales/modal-odontologo/modal-odontologo.component';
import { ModalEliminarUsuarioComponent } from './modales/modal-eliminar-usuario/modal-eliminar-usuario.component';
import { ModalEliminarOdontologoComponent } from './modales/modal-eliminar-odontologo/modal-eliminar-odontologo.component';
import { ModalEliminarPacienteComponent } from './modales/modal-eliminar-paciente/modal-eliminar-paciente.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ModalCitaComponent } from './modales/modal-cita/modal-cita.component';
import { ModalServicioComponent } from './modales/modal-servicio/modal-servicio.component';
import { ModalEliminarServicioComponent } from './modales/modal-eliminar-servicio/modal-eliminar-servicio.component';

//Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//angular material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

//controles para la fecha
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter'; /*npm install moment --save | npm i @angular/material-moment-adapter*/


@NgModule({
  declarations: [
    PagesComponent,
    NavegacionComponent,
    UsuarioComponent,
    ModalUsuarioComponent,
    PacienteComponent,
    OdontologoComponent,
    ServicioComponent,
    CitaComponent,
    ModalPacienteComponent,
    ModalOdontologoComponent,
    ModalEliminarUsuarioComponent,
    ModalEliminarOdontologoComponent,
    ModalEliminarPacienteComponent,
    ReporteComponent,
    ModalCitaComponent,
    ModalServicioComponent,
    ModalEliminarServicioComponent,
   
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
   ReusableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatExpansionModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,

    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatExpansionModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,

    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
   MomentDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PagesModule { }
