import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  email: string;
}

type Paciente = {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
};

type Cita = {
  id: string;
  idPaciente: string;
  nombre: string;
  fechaYHora: Timestamp;
};
