import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
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
