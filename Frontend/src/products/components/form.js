import React, { useState } from "react";
import { Form as BulmaForm } from 'react-bulma-components'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const StyledButton = styled.button`
  --color: 0 0% 60%;
  --color-has: 211deg 100% 48%;
  --sz: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--sz) * 2.5);
  width: calc(var(--sz) * 2.5);
  padding: 0.4rem 0.5rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid hsl(var(--color));

  &:hover {
    border-color: hsl(var(--color-has));
  }

  svg {
    overflow: visible;
    height: calc(var(--sz) * 1.75);
    width: calc(var(--sz) * 1.75);
    --ease: cubic-bezier(0.5, 0, 0.25, 1);
    --zoom-from: 1.75;
    --zoom-via: 0.75;
    --zoom-to: 1;
    --duration: 1s;
  }

  .has_saved:hover path[data-path="box"] {
    transition: all 0.3s var(--ease);
    animation: has-saved var(--duration) var(--ease) forwards;
    fill: hsl(var(--color-has) / 0.35);
  }
  .has_saved:hover path[data-path="line-top"] {
    animation: has-saved-line-top var(--duration) var(--ease) forwards;
  }
  .has_saved:hover path[data-path="line-bottom"] {
    animation: has-saved-line-bottom var(--duration) var(--ease) forwards,
      has-saved-line-bottom-2 calc(var(--duration) * 1) var(--ease)
        calc(var(--duration) * 0.75);
  }
`;

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
                <Label className="label" htmlFor="nombre_producto">nombre producto</Label>
                <Control>
                    <Input className="input" id="nombre_producto" placeholder="nombre_producto" name="nombre_producto" value={formValues.nombre_producto} onChange={handleChange} />
                </Control>
            </Field>
            <Field>
                <Label className="label" htmlFor="precio">precio</Label>
                <Control>
                    <Input className="input" id="precio" placeholder="precio" name="precio" value={formValues.precio} onChange={handleChange} type="number" />
                </Control>
            </Field>
            <Field>
                <Label className="label" htmlFor="cantidad">cantidad</Label>
                <Control>
                    <Input className="input" id="cantidad" placeholder="cantidad" name="cantidad" value={formValues.cantidad} onChange={handleChange} type="number" />
                </Control>
            </Field>
            <Field>
                <Label className="label" htmlFor="local">local</Label>
                <Control>
                    <Input className="input" id="local" placeholder="local" name="local" value={formValues.local} onChange={handleChange} />
                </Control>
            </Field>


            <StyledButton type="submit" id="submit-btn" data-testid="submit-btn"><svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            >
            <path
            d="m19,21H5c-1.1,0-2-.9-2-2V5c0-1.1.9-2,2-2h11l5,5v11c0,1.1-.9,2-2,2Z"
            stroke-linejoin="round"
            stroke-linecap="round"
            data-path="box"
            ></path>
            <path
            d="M7 3L7 8L15 8"
            stroke-linejoin="round"
            stroke-linecap="round"
            data-path="line-top"
            ></path>
            <path
            d="M17 20L17 13L7 13L7 20"
            stroke-linejoin="round"
            stroke-linecap="round"
            data-path="line-bottom"
            ></path>
            </svg></StyledButton>
        </form>
    );
}

export default Form;
