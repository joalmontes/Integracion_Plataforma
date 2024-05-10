import React, { useState } from "react";
import { Form as BulmaForm, Button} from 'react-bulma-components'

const { Field, Control, Label, Input } = BulmaForm

const FormAparto = ({ handleSubmit2 }) =>{

    const [formValues, setFormValues] = useState({
        dispositivo:'',
        modelo:''
    })

    const handleChange = (event) =>{
        const {name, value} = event.target

        setFormValues({...formValues, [name]:value})
    }
    const _handleSubmit = (e) =>{
        e.preventDefault()
        handleSubmit2 ({...formValues})
        console.log(formValues)

    }
    return (
        <form onSubmit={_handleSubmit}>
            <Field>
                <Label>dispositivo</Label>
                <Control>
                    <Input placeholder="Text Input" name="dispositivo" value={formValues.dispositivo} onChange={handleChange} />
                </Control>
            </Field>

            <Field>
                <Label>modelo</Label>
                <Control>
                    <Input placeholder="Text Input" name="modelo" value={formValues.modelo} onChange={handleChange}/>
                </Control>
            </Field>

            <Button type="submit">guardar</Button>

        </form>
    );
}

export default FormAparto