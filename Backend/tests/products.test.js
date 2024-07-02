
const request = require('supertest');
const express = require('express');
const router = require('../routes/product');
const Product = require('../models/Product');

jest.mock('../models/Product');

const app = express();
app.use(express.json());
app.use('/v1', router);

describe('Rutas de Productos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /v1/products', () => {
    it('debería agregar un nuevo producto', async () => {
      const productMock = {
        nombre_producto: 'Producto de Prueba',
        precio: 100,
        cantidad: 10,
        local: 'Local de Prueba',
        fecha_envio: '2024-07-02',
        save: jest.fn().mockResolvedValue({
          nombre_producto: 'Producto de Prueba',
          precio: 100,
          cantidad: 10,
          local: 'Local de Prueba',
          fecha_envio: '2024-07-02',
        }),
      };
      Product.mockImplementation(() => productMock);

      const res = await request(app)
        .post('/v1/products')
        .field('nombre_producto', 'Producto de Prueba')
        .field('precio', 100)
        .field('cantidad', 10)
        .field('local', 'Local de Prueba')
        .field('fecha_envio', '2024-07-02');

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        productStored: {
          nombre_producto: 'Producto de Prueba',
          precio: 100,
          cantidad: 10,
          local: 'Local de Prueba',
          fecha_envio: '2024-07-02',
        }
      });
    });

    it('debería retornar 500 si hay un error', async () => {
      Product.mockImplementation(() => {
        throw new Error('Error');
      });

      const res = await request(app)
        .post('/v1/products')
        .send({});

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Error' });
    });
  });

  describe('GET /v1/products', () => {
    it('debería obtener todos los productos', async () => {
      const productsMock = [{ name: 'Producto de Prueba' }];
      Product.find.mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(productsMock)
        })
      });

      const res = await request(app).get('/v1/products');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ products: productsMock });
    });
  });

  describe('DELETE /v1/products/:id', () => {
    it('debería eliminar un producto por id', async () => {
      const productId = '1';
      const deletedProductMock = { _id: productId };
      Product.findByIdAndDelete.mockResolvedValue(deletedProductMock);

      const res = await request(app).delete(`/v1/products/${productId}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Producto eliminado correctamente', deletedProduct: deletedProductMock });
    });

    it('debería retornar 404 si el producto no se encuentra', async () => {
      const productId = '1';
      Product.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete(`/v1/products/${productId}`);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'Producto no encontrado' });
    });

    it('debería retornar 500 si hay un error', async () => {
      const productId = '1';
      Product.findByIdAndDelete.mockRejectedValue(new Error('Error'));

      const res = await request(app).delete(`/v1/products/${productId}`);

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Error al eliminar el producto', error: 'Error' });
    });
  });
});
