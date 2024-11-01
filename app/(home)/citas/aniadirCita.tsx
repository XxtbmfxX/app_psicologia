import { useState } from "react";
import { View, Text, Button, TextInput, Pressable } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Link, useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { Cita, Paciente } from "@/types/types";
import { usePacientes } from "@/context/PacienteContext";

import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
import { useCitas } from "@/context/CitasContext";

export default function Formulario() {
    const router = useRouter();

    const { pacientes } = usePacientes();
    const { addCita } = useCitas()


    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(pacientes[0].id);
    const [pacienteNombre, setPacienteNombre] = useState(pacientes[0].nombre);


    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const enviarFormulario = async () => {

        const citaAGuardar: Cita = {
            idPaciente: pacienteSeleccionado,
            nombre: pacienteNombre,
            fechaYHora: date,
        }

        addCita(citaAGuardar)

        router.push("/(home)/citas");

        setDate(new Date)
        setPacienteSeleccionado(pacientes[0].id)
        setPacienteNombre(pacientes[0].nombre)
    };

    return (
        <SafeAreaView className="flex-1 p-6 bg-gray-100">
            <Link href={"/(home)/citas"} >
                <Text>Volver a citas</Text>
            </Link>

            <Text className="text-lg mb-2">Selecciona un paciente:</Text>

            {/* Selección de un paciente */}

            <Picker
                selectedValue={pacienteSeleccionado}
                onValueChange={(itemValue, index) => {
                    setPacienteSeleccionado(itemValue)
                    setPacienteNombre(pacientes[index].nombre)
                }}
                className="mb-4 bg-white"
            >
                {pacientes.map((paciente: Paciente) => (
                    <Picker.Item
                        key={paciente.id}
                        label={paciente.nombre}
                        value={paciente.id}
                    />
                ))}
            </Picker>

            {/* Selección de fecha y hora */}

            <Button onPress={showDatepicker} title="Seleccionar Fecha" />
            <Button onPress={showTimepicker} title="Seleccionar Hora" />
            <Text>selected: {date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}

            {/* Selección finalizada */}
            <Pressable
                onPress={enviarFormulario}
                className="mt-4 bg-blue-500 text-white"
            >
                <Text>Enviar</Text>
            </Pressable>

        </SafeAreaView>
    );
}
