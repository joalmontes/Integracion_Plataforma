import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import ProductLayout from './productLayout';
import { getProducts, saveProduct } from '../sevices/index';

jest.mock('../sevices/index', () => ({
    getProducts: jest.fn(),
    saveProduct: jest.fn(),
}));

jest.mock('react-datepicker', () => ({
    __esModule: true,
    default: ({ onChange }) => <input type="text" onChange={(e) => onChange(e.target.value)} />,
}));
jest.setTimeout(10000);

describe('Componente ProductLayout', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('renderiza el componente de carga inicialmente', async () => {
        getProducts.mockResolvedValue({ status: 200, data: { products: [] } });

        render(<ProductLayout />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        expect(screen.getByText('TIENDA')).toBeInTheDocument();
    });

    test('muestra el mensaje de no hay productos cuando no hay productos disponibles', async () => {
        getProducts.mockResolvedValue({ status: 200, data: { products: [] } });

        render(<ProductLayout />);

        await waitFor(() => {
            expect(screen.getByText('no hay productos disponible')).toBeInTheDocument();
        });
    });

    test('muestra la lista de productos cuando hay productos disponibles', async () => {
        const mockProducts = [
            { _id: 1, nombre_producto: 'Producto 1', precio: 10, cantidad: 5, local: 'Local A', createdAt: '2023-01-01' },
            { _id: 2, nombre_producto: 'Producto 2', precio: 15, cantidad: 3, local: 'Local B', createdAt: '2023-01-02' }
        ];
        getProducts.mockResolvedValue({ status: 200, data: { products: mockProducts } });

        render(<ProductLayout />);

        await waitFor(() => {
            expect(screen.getByText('Producto 1')).toBeInTheDocument();
            expect(screen.getByText('Producto 2')).toBeInTheDocument();
            expect(screen.getByText(/presio: \$10/i)).toBeInTheDocument();
            expect(screen.getByText(/cantidad: 5/i)).toBeInTheDocument();
            expect(screen.getByText(/Local A/i)).toBeInTheDocument();
            expect(screen.getByText(/Local B/i)).toBeInTheDocument();
        });
    });

    test('abre y cierra el modal al hacer clic en el botón de agregar', async () => {
        getProducts.mockResolvedValue({ status: 200, data: { products: [] } });
    
        render(<ProductLayout />);
    
        await waitFor(() => {
            expect(screen.getByText('TIENDA')).toBeInTheDocument();
        });
    
        fireEvent.click(screen.getByText('Nuevo'));
    
        expect(screen.getByText('agregar productos')).toBeInTheDocument();
    
        fireEvent.click(screen.getByLabelText('close'));
    
        await waitFor(() => {
            expect(screen.queryByText('agregar productos')).not.toBeInTheDocument();
        });
    });

    test('envía el formulario y recarga los productos', async () => {
        const initialProducts = [{ id: 1, nombre_producto: 'Product A', precio: 10, cantidad: 5, local: 'Local A' }, { id: 2, nombre_producto: 'Product B', precio: 15, cantidad: 3, local: 'Local B' }];
        const newProducts = [{ id: 1, nombre_producto: 'Product A', precio: 10, cantidad: 5, local: 'Local A' }, { id: 2, nombre_producto: 'Product B', precio: 15, cantidad: 3, local: 'Local B' }, { id: 3, nombre_producto: 'Nuevo Producto', precio: 100, cantidad: 5, local: 'Local A' }];
        
        getProducts.mockResolvedValueOnce({ status: 200, data: { products: initialProducts } });
        getProducts.mockResolvedValueOnce({ status: 200, data: { products: newProducts } });
        
        render(<ProductLayout />);
    
        await waitFor(() => {
            expect(screen.getByText('TIENDA')).toBeInTheDocument();
        });
    
        await waitFor(() => {
            expect(screen.getByText('Product A')).toBeInTheDocument();
            expect(screen.getByText('Product B')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Nuevo'));
    
        fireEvent.change(screen.getByLabelText('nombre producto'), { target: { value: 'Nuevo Producto' } });
        fireEvent.change(screen.getByLabelText('precio'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('cantidad'), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText('local'), { target: { value: 'Local A' } });
    
        fireEvent.click(screen.getByTestId('submit-btn'));
    
        await waitFor(() => {
            expect(saveProduct).toHaveBeenCalledWith({
                nombre_producto: 'Nuevo Producto',
                precio: '100',
                cantidad: '5',
                local: 'Local A',
                fecha_envio: expect.any(Date) 
            });
        });
    

        await waitFor(() => {
            expect(getProducts).toHaveBeenCalledTimes(2); 
        });
    

        await waitFor(() => {
            console.log(screen.debug()); 
            expect(screen.getByText('Product A')).toBeInTheDocument();
            expect(screen.getByText('Product B')).toBeInTheDocument();
            expect(screen.getByText('Nuevo Producto')).toBeInTheDocument();
        });
    });
});
