import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Products.css";

function Products({ product, cart = [], setCart }) {
  return (
    <div className="product-container">
      <div className="product-items-container">
        {product.length > 0 ? (
          product.map((item) => {
            const isInCart = cart.find((cartItem) => cartItem.id === item.id);

            return (
              <Card className="card" style={{ width: "18rem" }} key={item.id}>
                <Card.Img variant="top" src={item.thumbnailUrl} />
                <Card.Body style={{display:'flex',flexDirection:'column', height:'175px'}}>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>price: ${item.price}</Card.Text>

                  {isInCart ? (
                    <span className="badge bg-danger">Added</span>
                  ) : (
                    <Button
                    className="btn--1"
                      onClick={() => setCart([...cart, item])}
                      variant="outline-primary"
                    >
                      Add to cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
