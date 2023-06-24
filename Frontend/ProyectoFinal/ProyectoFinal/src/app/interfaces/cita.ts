import { DetalleCita } from "./detalle-cita";
export interface Cita {

    idCita?: number,
    numeroDocumento?: string,
    fechaRegistro?: string,
    fechaReserva?: string,
    totalTexto?: string,
    DetalleCita?:DetalleCita[]



}
