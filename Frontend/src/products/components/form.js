import React, { useState, useEffect } from "react";
import { Form as BulmaForm, Button } from 'react-bulma-components'
import { getFuncionario, getAparato} from "../sevices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

const { Field, Control, Label, Input } = BulmaForm

const Form = ({ handleSubmit }) => {

    const [formValues, setFormValues] = useState({
        nombre_funcionario: '',
        aparato: '',
        numero: '',
        lugar_donde: '',
        fecha_entrega: new Date(),
        correo: '' 
    })

    const [funcionarios, setFuncionarios] = useState([]);
    const [aparatos, setAparatos] = useState([])

    useEffect(() => {
        async function fetchFuncionarios() {
            const response = await getFuncionario();
            if (response.status === 200) {
                setFuncionarios(response.data.funcionarios);
            }
        }
        fetchFuncionarios();

        async function fetchAparato() {
            const response = await getAparato();
            if (response.status === 200) {
                setAparatos(response.data.aparato);
            }
        }
        fetchAparato();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        if (name === 'nombre_funcionario') {
            // Encuentra el objeto de funcionario correspondiente al valor seleccionado
            const selectedFuncionario = funcionarios.find(funcionario => 
                funcionario.nombre_Apellido === value.substring(0, value.lastIndexOf('(')).trim()
            );
            // Si se encontró un funcionario correspondiente, extrae su correo electrónico
            const correo = selectedFuncionario ? selectedFuncionario.correo : '';
            // Actualiza el estado del formulario con el valor seleccionado y el correo electrónico
            setFormValues({ ...formValues, [name]: value, correo: correo });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const handleDateChange = (date) => {
        setFormValues({ ...formValues, fecha_entrega: date });
    };

    const _handleSubmit = (e) => {
        e.preventDefault();
        handleSubmit({ ...formValues });
        console.log(formValues);
    };

    return (
        <form onSubmit={_handleSubmit}>
            <Field>
                <Label>nombre_funcionario</Label>
                <Control>
                    <Input
                        list="funcionarios"
                        placeholder="Selecciona un funcionario"
                        name="nombre_funcionario"
                        value={formValues.nombre_funcionario}
                        onChange={handleChange}
                    />
                    <datalist id="funcionarios">
                        {funcionarios.map((funcionario, index) => (
                            <option key={index} value={funcionario.nombre_Apellido + ' ' + '(' + funcionario.cargo + ')' } />
                        ))}
                    </datalist>
                </Control>
            </Field>

            <Field>
                <Label>correo</Label>
                <Control>
                    <Input
                        placeholder="Correo electrónico"
                        name="correo"
                        value={formValues.correo}
                        onChange={handleChange}
                        disabled //
                    />
                </Control>
            </Field>

            <Field>
                <Label>aparato</Label>
                <Control>
                    <Input
                        list="aparatos"
                        placeholder="Selecciona un aparato"
                        name="aparato"
                        value={formValues.aparato}
                        onChange={handleChange}
                    />
                    <datalist id="aparatos">
                        {aparatos.map((aparato, index) => (
                            <option key={index} value={aparato.dispositivo + ' '+ '('+aparato.modelo + ')' } />
                        ))}
                    </datalist>
                </Control>
            </Field>

            <Field>
                <Label>numero</Label>
                <Control>
                    <Input placeholder="Número" name="numero" value={formValues.numero} onChange={handleChange} type="number" />
                </Control>
            </Field>

            <Field>
                <Label>lugar_donde</Label>
                <Control>
                    <Input placeholder="Lugar donde" name="lugar_donde" value={formValues.lugar_donde} onChange={handleChange} />
                </Control>
            </Field>

            <Field>
                <Label>fecha_entrega</Label>
                <Control>
                    <DatePicker
                        selected={formValues.fecha_entrega}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        locale={es}
                    />
                </Control>
            </Field>

            <Button type="submit">guardar</Button>

        </form>
    );
}

export default Form;
