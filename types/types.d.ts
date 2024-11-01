import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  email: string;
}

// Opcional
// export interface Paciente {
//   id: string;
//   firstName: string;
//   lastName: string;
//   rut: string;
//   dv: string;
//   phone: string;
//   nextControl: Date;
// }

type Paciente = {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
};

type Cita = {
  idPaciene: string,
  nombre: string,
  fechaYHora: Timestamp
}