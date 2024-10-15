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

type Patient = {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  fechaControl: Date;
};