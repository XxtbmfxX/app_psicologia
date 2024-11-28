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
  apellido: string;
  fechaYHora: Timestamp;
};

type Transcripcion = {
  id: string;
  resource_url: string;
  status: string;
  created?: string;
  audio_url?: string;
  completed?: string;
  error?: string;
  text?: string
};
