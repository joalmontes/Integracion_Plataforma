const { addProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/productControllers');
const Product = require('../models/Product');
const httpMocks = require('node-mocks-http');

jest.mock('../models/Product');

describe('Product Controllers', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
  });

  describe('addProduct', () => {
    it('debería agregar un producto y devolver el código de estado 201', async () => {
      req.body = {
        nombre_producto: 'Producto1',
        precio: 100,
        cantidad: 10,
        local: 'Local1',
        fecha_envio: '2024-07-01'
      };
      const productMock = new Product(req.body);
      productMock.save = jest.fn().mockResolvedValue(req.body);
      Product.mockImplementation(() => productMock);

      await addProduct(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({ productStored: req.body });
      expect(productMock.save).toHaveBeenCalled();
    });

    it('debería devolver 500 si hay un error', async () => {
      req.body = {
        nombre_producto: 'Producto1',
        precio: 100,
        cantidad: 10,
        local: 'Local1',
        fecha_envio: '2024-07-01'
      };
      const productMock = new Product(req.body);
      productMock.save = jest.fn().mockRejectedValue(new Error('Error'));
      Product.mockImplementation(() => productMock);

      await addProduct(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error' });
    });
  });

  describe('getProducts', () => {
    it('debería devolver todos los productos', async () => {
      const productsMock = [
        { nombre_producto: 'Producto1', precio: 100, cantidad: 10, local: 'Local1', fecha_envio: '2024-07-01' },
        { nombre_producto: 'Producto2', precio: 200, cantidad: 20, local: 'Local2', fecha_envio: '2024-07-02' }
      ];
      Product.find = jest.fn().mockReturnValue({ lean: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(productsMock) }) });

      await getProducts(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ products: productsMock });
    });
  });
  describe('deleteProduct', () => {
    it('debería eliminar un producto y devolver el código de estado 200', async () => {
      const deletedProductMock = { nombre_producto: 'Producto1', precio: 100, cantidad: 10, local: 'Local1', fecha_envio: '2024-07-01' };
      Product.findByIdAndDelete = jest.fn().mockResolvedValue(deletedProductMock);

      req.params.id = '1';

      await deleteProduct(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: 'Producto eliminado correctamente', deletedProduct: deletedProductMock });
    });

    it('debería devolver 404 si no se encuentra el producto', async () => {
      Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      req.params.id = '1';

      await deleteProduct(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Producto no encontrado' });
    });

    it('debería devolver 500 si hay un error', async () => {
      Product.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Error'));

      req.params.id = '1';

      await deleteProduct(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error al eliminar el producto', error: 'Error' });
    });
  });
  describe('updateProduct', () => {
    it('debería actualizar un producto y devolver el código de estado 200', async () => {
      const productId = '1';
      req.params.id = productId;
      req.body = {
        nombre_producto: 'Producto Actualizado',
        precio: 150,
        cantidad: 20,
        local: 'Local Actualizado',
        fecha_envio: '2024-08-01',
      };

      const updatedProductMock = { 
        _id: productId, 
        ...req.body 
      };
      Product.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedProductMock);

      await updateProduct(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ 
        message: 'Producto actualizado correctamente', 
        updatedProduct: updatedProductMock 
      });
    });

    it('debería devolver 404 si no se encuentra el producto', async () => {
      const productId = '1';
      req.params.id = productId;
      req.body = {
        nombre_producto: 'Producto Actualizado',
        precio: 150,
        cantidad: 20,
        local: 'Local Actualizado',
        fecha_envio: '2024-08-01',
      };

      Product.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updateProduct(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'Producto no encontrado' });
    });

    it('debería devolver 500 si hay un error', async () => {
      const productId = '1';
      req.params.id = productId;
      req.body = {
        nombre_producto: 'Producto Actualizado',
        precio: 150,
        cantidad: 20,
        local: 'Local Actualizado',
        fecha_envio: '2024-08-01',
      };

      Product.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Error'));

      await updateProduct(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({ message: 'Error al actualizar el producto', error: 'Error' });
    });
  });
});
