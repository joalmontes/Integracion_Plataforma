import React, { useState, useEffect } from "react";
import { Form as BulmaForm, Button } from 'react-bulma-components'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

const { Field, Control, Label, Input } = BulmaForm

const Form = ({ handleSubmit }) => {

    const [formValues, setFormValues] = useState({
        nombre_producto: '',
        precio: '',
        cantidad: '',
        local: '',
        fecha_envio: new Date(),

    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
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
                <Label>nombre producto</Label>
                <Control>
                    <Input placeholder="nombre_producto" name="nombre_producto" value={formValues.nombre_producto} onChange={handleChange} />
                </Control>
            </Field>
            <Field>
                <Label>precio</Label>
                <Control>
                    <Input placeholder="precio" name="precio" value={formValues.precio} onChange={handleChange} type="number" />
                </Control>
            </Field>
            <Field>
                <Label>cantidad</Label>
                <Control>
                    <Input placeholder="cantidad" name="cantidad" value={formValues.cantidad} onChange={handleChange} type="number" />
                </Control>
            </Field>
            <Field>
                <Label>local</Label>
                <Control>
                    <Input placeholder="local" name="local" value={formValues.local} onChange={handleChange} />
                </Control>
            </Field>

            <Field>
                <Label>fecha_envio</Label>
                <Control>
                    <DatePicker
                        selected={formValues.fecha_envio}
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
