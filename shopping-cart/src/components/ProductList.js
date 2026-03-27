import Product from "./Product.js";

export default function ProductList(props) {
  if (props.productList.length > 0) {
    return (
      <>
        {props.productList.map((product, i) => {
          return (
            <Product
              product={product}
              key={i}
              incrementQuantity={props.incrementQuantity}
              decrementQuantity={props.decrementQuantity}
              removeItem={props.removeItem}
              index={i}
            />
          );
        })}
      </>
    );
  } else {
    return <h1>No Products to Display in the Cart</h1>;
  }
}
