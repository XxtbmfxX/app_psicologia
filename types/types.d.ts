import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

type PacientesContextType = {
  pacientes: Paciente[];
  pacientesArchivados: Paciente[];
  agregarPaciente: (data: Omit<Paciente, "id">) => Promise<void>;
  archivarPaciente: (pacienteId: string) => Promise<void>;
  devolverPacienteArchivado: (pacienteId: string) => Promise<void>;
  obtenerPacientePorId: (id: string) => Promise<null | any>;
  actualizarPaciente: (id: string, data: any) => Promise<void>;
  pacientesFiltrados: Paciente[];
  setFiltroBusqueda: Dispatch<SetStateAction<string>>;
};

/**
 * El modelo de datos del paciente
 * - En caso de cambiar la etructura de datos es necesario cambiar este typo primero
 */
type Paciente = {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
};

/**
 * El modelo de datos de las citas
 * - En caso de cambiar la etructura de datos es necesario cambiar este typo primero
 */
type Cita = {
  id: string;
  idPaciente: string;
  nombre: string;
  apellido: string;
  fechaYHora: Timestamp;
};

/**
 * El modelo de datos de las transcripciones
 * - En caso de cambiar la etructura de datos es necesario cambiar este typo primero
 */
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
