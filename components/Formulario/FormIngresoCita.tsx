import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { usePacientes } from "@/context/PacienteContext";
import { useCitas } from "@/context/CitasContext";
import { Cita, Paciente } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomPressable from "../common/CustomPressable";
import CustomLink from "../common/CustomLink";

type Props = {
  citaExistente?: Cita; // Parámetro opcional para cita existente
};

const FormIngresoCita = ({ citaExistente }: Props) => {
  const router = useRouter();
  const { pacientes } = usePacientes();
  const { addCita, updateCita } = useCitas();

  const [pacienteId, setPacienteId] = useState(citaExistente?.idPaciente || "");
  const [pacienteNombre, setPacienteNombre] = useState(
    citaExistente?.nombre || ""
  );
  const [date, setDate] = useState(
    citaExistente?.fechaYHora.toDate() || new Date()
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pacienteId && pacientes.length > 0) {
      const paciente = pacientes.find((p) => p.id === pacienteId);
      setPacienteNombre(paciente ? paciente.nombre : "");
    }
  }, [pacienteId, pacientes]);

  const onChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  };

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
      fechaYHora: date,
      ...(citaExistente ? { id: citaExistente.id } : {}), // Añadir ID si es edición
    };

    if (citaExistente) {
      await updateCita(citaData); // Actualizar cita existente
    } else {
      await addCita(citaData); // Añadir nueva cita
    }
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
          setError(""); // Borrar el error al seleccionar un paciente
        }}
        style={{ backgroundColor: "white" }}
      >
        {pacientes.map((paciente: Paciente) => (
          <Picker.Item
            key={paciente.id}
            label={paciente.nombre}
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
