export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Paciente {
  id: string;
  firstName: string;
  lastName: string;
  rut: string;
  dv: string;
  phone: string;
  nextControl: Date;
}
