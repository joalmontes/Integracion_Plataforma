import React, { useState, useEffect } from "react";
import { Form as BulmaForm, Button } from 'react-bulma-components'
import { deleteProduct } from "../sevices";
const { Field, Control, Label, Input } = BulmaForm;


const FormHistorial = ({ handleSubmit, product }) => {
    const [formValues, setFormValues] = useState({
        aparato: '',
        mes: '',
        anno: ''
    });

    useEffect(() => {
        if (product) {
            const { aparato, createdAt } = product;
            const date = new Date(createdAt);
            setFormValues({
                aparato,
                mes: (date.getMonth() + 1).toString(), 
                anno: date.getFullYear().toString()
            });
        }
    }, [product]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const _handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmit({ ...formValues });
        console.log(formValues);
        await deleteProduct(product._id);
        window.location.reload(); 
    };

    return (
        <form onSubmit={_handleSubmit}>
            <Field>
                <Label>Aparato</Label>
                <Control>
                    <Input placeholder="Aparato" name="aparato" value={formValues.aparato} onChange={handleChange} />
                </Control>
            </Field>

            <Field>
                <Label>Mes</Label>
                <Control>
                    <Input type="number" placeholder="Mes" name="mes" value={formValues.mes} onChange={handleChange} />
                </Control>
            </Field>

            <Field>
                <Label>Año</Label>
                <Control>
                    <Input type="number" placeholder="Año" name="anno" value={formValues.anno} onChange={handleChange} />
                </Control>
            </Field>

            <Button type="submit">Guardar</Button>
        </form>
    );
}

export default FormHistorial;