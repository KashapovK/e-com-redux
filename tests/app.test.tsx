import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach } from 'vitest';
import { expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

import App from '../src/app';
import { Product } from '../src/types';
import { setProducts } from '../src/redux/cartSlice';

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
      </Provider>,
    );

    expect(screen.queryByText(/Интернет-магазин/i)).not.toBeNull();

    await waitFor(() => {
      const buttons = screen.queryAllByText(/Добавить в корзину/i);
      expect(buttons.length).to.be.greaterThan(0);
    });
  });
});
