import { View, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { usePacientes } from "@/context/PacienteContext";
import { useCitas } from "@/context/CitasContext";
import { Cita, Paciente } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomPressable from "../common/CustomPressable";

type Props = {
  citaId?: string;
};
/**
 * Descripción:
* Este componente permite al usuario ingresar o editar una cita para un paciente. Si se proporciona un citaId, 
* se cargan los datos de la cita existente para su edición; si no, se trata de la creación de una nueva cita.
* @props citaId?: (opcional) ID de la cita a editar. Si no se proporciona, se asume que se está creando una nueva cita.
* ## Funcionalidades:
* - Permite seleccionar un paciente de la lista de pacientes.
* - Permite seleccionar la fecha y la hora de la cita mediante un selector de fecha y hora.
* - Valida que se haya seleccionado un paciente antes de enviar el formulario.
* - Si citaId está presente, actualiza la cita; si no, crea una nueva cita.
* Muestra un mensaje de éxito al agendar la cita.
* ## Estados:
* - pacienteId: ID del paciente seleccionado.
* - pacienteNombre: Nombre del paciente seleccionado.
* - pacienteApellido: Apellido del paciente seleccionado.
* - date: Fecha y hora seleccionada para la cita.
* - mode: Modo del selector de fecha/hora.
* - show: Controla la visibilidad del selector de fecha/hora.
* - error: Mensaje de error en caso de no haber seleccionado un paciente.
* @example
* <FormIngresoCita citaId="123" />
 */
const FormIngresoCita = ({ citaId }: Props) => {
  const router = useRouter();
  const { pacientes } = usePacientes();
  const { addCita, updateCita, getCitaById } = useCitas();

  const [pacienteId, setPacienteId] = useState("");
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [pacienteApellido, setPacienteApellido] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  // Cargar los datos de la cita si citaId está presente
  useEffect(() => {
    const cargarCita = async () => {
      if (citaId) {
        const cita = await getCitaById(citaId);
        if (cita) {
          setPacienteId(cita.idPaciente);
          setPacienteNombre(cita.nombre);
          setPacienteApellido(cita.apellido);
          setDate(cita.fechaYHora.toDate());
        }
      }
    };
    cargarCita();
  }, [citaId, getCitaById]);

  useEffect(() => {
    if (pacienteId && pacientes.length > 0) {
      const paciente = pacientes.find((p) => p.id === pacienteId);
      setPacienteNombre(paciente ? paciente.nombre : "");
      setPacienteApellido(paciente ? paciente.apellido : "");
    }
  }, [pacienteId, pacientes]);

  {/* @ts-ignore */ }
  const onChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

  {/* @ts-ignore */}
  const showMode = (currentMode) => setShow(true) || setMode(currentMode);
  const showDatepicker = () => showMode("date");
  const showTimepicker = () => showMode("time");

  const enviarFormulario = async () => {
    if (!pacienteId || !pacienteNombre) {
      setError("Por favor, selecciona un paciente antes de continuar.");
      return;
    }
    setError("");

    const citaData: Cita = {
      idPaciente: pacienteId,
      nombre: pacienteNombre,
      apellido: pacienteApellido,
      // @ts-ignore
      fechaYHora: date,
      ...(citaId ? { id: citaId } : {}), // Añadir ID si es edición
    };

    if (citaId) {
      await updateCita(citaData); // Actualizar cita existente
    } else {
      await addCita(citaData); // Añadir nueva cita
    }

    Alert.alert("Cita agendada 😎");

    router.push("/(home)/citas");
  };

  return (
    <View>
      <Text className="text-xl mb-5 text-center">Selecciona un paciente:</Text>

      <Picker
        selectedValue={pacienteId}
        onValueChange={(itemValue, index) => {
          setPacienteId(itemValue);
          setPacienteNombre(pacientes[index].nombre);
          setPacienteApellido(pacientes[index].apellido);
          setError(""); // Borrar el error al seleccionar un paciente
        }}
        style={{ backgroundColor: "white" }}
      >
        {pacientes.map((paciente: Paciente) => (
          <Picker.Item
            key={paciente.id}
            label={paciente.nombre + " " + paciente.apellido}
            value={paciente.id}
          />
        ))}
      </Picker>

      <CustomPressable onPress={showDatepicker} title="Seleccionar Fecha" />
      <CustomPressable onPress={showTimepicker} title="Seleccionar Hora" />

      <View className="my-5">
        <Text className="text-xl text-center">Fecha seleccionada</Text>
        <Text className="text-xl text-center">{date.toLocaleString()}</Text>
        <Text className="text-xl text-center">Paciente seleccionado</Text>
        <Text className="text-xl text-center">
          {pacienteNombre
            ? pacienteNombre
            : "Seleccione un paciente （*＾-＾*）"}
        </Text>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          //@ts-ignore
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      {/* Mostrar mensaje de error si existe */}
      {error ? (
        <Text className="text-lg bg-red-500 text-white text-center rounded-xl my-2">
          {error}
        </Text>
      ) : null}

      <CustomPressable onPress={enviarFormulario} title="Guardar" />
    </View>
  );
};

export default FormIngresoCita;
