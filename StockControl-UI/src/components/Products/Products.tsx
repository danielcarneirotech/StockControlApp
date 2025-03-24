import { useCallback, useEffect, useState } from 'react';
import { getProducts, postProduct } from '../../services/ProductService/productService';
import { showSuccessToast } from '../../services/ToastService/toastService';
import { Product, ProductToAdd } from '../../types/product';
import { handleError } from '../../utils/utils';
import Button from '../Button/Button';
import { Card } from '../Card/Card';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Table from '../Table/Table';
import './Products.css';

const columns: { header: string; accessor: keyof ProductToAdd }[] = [
  { header: 'Product Name', accessor: 'name' },
  { header: 'Product Code', accessor: 'code' },
];

function Products() {
  const initialProductState = {
    name: '',
    code: '',
  };

  const [isGetProductsLoading, setisGetProductsLoading] = useState<boolean>(false);
  const [isAddProductLoading, setIsAddProductLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductToAdd>(initialProductState);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target as HTMLInputElement;
    setProduct((prevParams) => ({
      ...prevParams,
      [id]: value,
    }));
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addProduct();
  };

  async function addProduct() {
    setIsAddProductLoading(true);
    await postProduct(product)
      .then(() => {
        addProductSucceeded();
      })
      .catch((error) => {
        addProductFailed(error);
      })
      .finally(() => {
        setIsAddProductLoading(false);
      });
  }

  function addProductSucceeded() {
    showSuccessToast('Product added successfully');
    setProduct(initialProductState);
    loadProducts();
  }

  function addProductFailed(error: unknown) {
    handleError(error, 'Failed to add product');
  }

  function getProductsSucceeded(newProducts: Product[]) {
    setProducts(newProducts);
  }

  function getProductsFailed(error: unknown) {
    handleError(error, 'Failed to load products');
    setProducts([]);
  }

  const loadProducts = useCallback(async () => {
    setisGetProductsLoading(true);
    await getProducts()
      .then((response) => {
        getProductsSucceeded(response.data.$values);
      })
      .catch((error) => {
        getProductsFailed(error);
      })
      .finally(() => {
        setisGetProductsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <Card dataTestId="product-card">
        <Card.Header>
          <h1>Products</h1>
          <p>Add and list products on the system</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.FormGroup>
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <Input
                required
                data-testid="product-name-input"
                type="text"
                id="name"
                className="form-control"
                value={product.name}
                onChange={handleInputChange}
                placeholder="Write the product name"
              />
            </Form.FormGroup>
            <Form.FormGroup>
              <label htmlFor="code" className="form-label">
                Product Code
              </label>
              <Input
                required
                data-testid="product-code-input"
                type="text"
                id="code"
                className="form-control"
                value={product.code}
                onChange={handleInputChange}
                placeholder="Write the product code"
              />
            </Form.FormGroup>
            <Button
              data-testid="add-product-button"
              disabled={isAddProductLoading}
              type="submit"
              className="primary"
            >
              {isAddProductLoading ? <LoadingIcon /> : 'Add Product'}
            </Button>
          </Form>
          {isGetProductsLoading ? (
            <LoadingIcon />
          ) : (
            <Table
              dataTestId="products-table"
              className="products-table"
              columns={columns}
              data={products}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Products;
