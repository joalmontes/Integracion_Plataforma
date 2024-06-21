import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './form';
import {act} from 'react-dom/test-utils';

test('renderiza el formulario con todos los campos', async() => {
    await act(() => {
        render(<Form handleSubmit={() => {}} />);
    });

    expect(screen.getByLabelText(/nombre producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cantidad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/local/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
});

test('permite al usuario ingresar datos', () => {
    render(<Form handleSubmit={() => {}} />);

    const nombreProductoInput = screen.getByLabelText(/nombre producto/i);
    const precioInput = screen.getByLabelText(/precio/i);
    const cantidadInput = screen.getByLabelText(/cantidad/i);
    const localInput = screen.getByLabelText(/local/i);

    fireEvent.change(nombreProductoInput, { target: { value: 'Producto A' } });
    fireEvent.change(precioInput, { target: { value: '100' } });
    fireEvent.change(cantidadInput, { target: { value: '10' } });
    fireEvent.change(localInput, { target: { value: 'Local 1' } });

    expect(nombreProductoInput.value).toBe('Producto A');
    expect(precioInput.value).toBe('100');
    expect(cantidadInput.value).toBe('10');
    expect(localInput.value).toBe('Local 1');
});

test('llama a handleSubmit con los datos del formulario al enviar', () => {
    const handleSubmit = jest.fn();
    render(<Form handleSubmit={handleSubmit} />);

    const nombreProductoInput = screen.getByLabelText(/nombre producto/i);
    const precioInput = screen.getByLabelText(/precio/i);
    const cantidadInput = screen.getByLabelText(/cantidad/i);
    const localInput = screen.getByLabelText(/local/i);
    const submitButton = screen.getByTestId('submit-btn');

    fireEvent.change(nombreProductoInput, { target: { value: 'Producto A' } });
    fireEvent.change(precioInput, { target: { value: '100' } });
    fireEvent.change(cantidadInput, { target: { value: '10' } });
    fireEvent.change(localInput, { target: { value: 'Local 1' } });

    userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
        nombre_producto: 'Producto A',
        precio: '100',
        cantidad: '10',
        local: 'Local 1',
        fecha_envio: expect.any(Date),  
    });
});
