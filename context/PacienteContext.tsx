import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

type Paciente = {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
};

type PacientesContextType = {
  pacientes: Paciente[];
  agregarPaciente: (data: Omit<Paciente, 'id'>) => Promise<void>;
};

const PacientesContext = createContext<PacientesContextType | undefined>(undefined);

export const usePacientes = () => {
  const context = useContext(PacientesContext);
  if (!context) {
    throw new Error('usePacientes debe ser usado dentro de un PacientesProvider');
  }
  return context;
};

export const PacientesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const obtenerPacientes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pacientes'));
      const pacientesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Paciente[];
      setPacientes(pacientesData);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  const agregarPaciente = async (data: Omit<Paciente, 'id'>) => {
    try {
      await addDoc(collection(db, 'pacientes'), data);
      await obtenerPacientes(); // Actualiza la lista
    } catch (error) {
      console.error('Error al agregar paciente:', error);
    }
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  return (
    <PacientesContext.Provider value={{ pacientes, agregarPaciente }}>
      {children}
    </PacientesContext.Provider>
  );
};
