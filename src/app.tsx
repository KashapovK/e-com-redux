import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./redux/actions";
import products from "./mocks/products";
import Product from "./product";
import Cart from "./cart";
import { CartItem, StoreState } from "./types";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loadedProducts = useSelector((state: StoreState) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve));
      dispatch(setProducts(products));
    };

    fetchProducts();
  }, [dispatch]);

  const isProduct = (item: unknown): item is CartItem => {
    return (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "name" in item &&
      "price" in item &&
      typeof (item as CartItem).id === "string" &&
      typeof (item as CartItem).name === "string" &&
      typeof (item as CartItem).price === "number"
    );
  };

  const validProducts = loadedProducts.filter(isProduct) as CartItem[];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Интернет-магазин</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {validProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
};

export default App;
