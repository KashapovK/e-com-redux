import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { setProducts } from '../src/redux/actions';
import App from '../src/app';
import { Product } from '../src/types';

describe('App Component', () => {
  beforeEach(() => {
    const products: Product[] = [
      { id: '1', name: 'Test Product', price: 100 },
      { id: '2', name: 'Another Product', price: 200 },
    ];

    store.dispatch(setProducts(products));
  });

  it('рендерит продукты после загрузки', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Интернет-магазин/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
      expect(screen.getByText(/Another Product/i)).toBeInTheDocument();
    });
  });
});
