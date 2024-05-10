import React, { useState } from "react";
import { Form as BulmaForm, Button} from 'react-bulma-components'

const { Field, Control, Label, Input } = BulmaForm

const FormFuncionario = ({ handleSubmit1 }) =>{

    const [formValues, setFormValues] = useState({
        nombre_Apellido:'',
        cargo:''
    })

    const handleChange = (event) =>{
        const {name, value} = event.target

        setFormValues({...formValues, [name]:value})
    }
    const _handleSubmit = (e) =>{
        e.preventDefault()
        handleSubmit1 ({...formValues})
        console.log(formValues)

    }
    return (
        <form onSubmit={_handleSubmit}>
            <Field>
                <Label>nombre_funcionario</Label>
                <Control>
                    <Input placeholder="Text Input" name="nombre_Apellido" value={formValues.nombre_Apellido} onChange={handleChange} />
                </Control>
            </Field>

            <Field>
                <Label>cargo</Label>
                <Control>
                    <Input placeholder="Text Input" name="cargo" value={formValues.cargo} onChange={handleChange}/>
                </Control>
            </Field>
            <Field>
                <Label>correo</Label>
                <Control>
                    <Input placeholder="Text Input" name="correo" value={formValues.correo} onChange={handleChange}/>
                </Control>
            </Field>

            <Button type="submit">guardar</Button>

        </form>
    );
}

export default FormFuncionario