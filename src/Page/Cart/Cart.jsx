import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Cart.css";

function Carts({ cart, setCart }) {
  return (
    <div className="cart-container">
      <div className="cart-items-container">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <Card style={{ width: "18rem" }} key={`cart-${item.id}-${index}`}>
              <Card.Img variant="top" src={item.thumbnailUrl} />
              <Card.Body style={{display:'flex',flexDirection:'column', height:'175px'}}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>price: ${item.price}</Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setCart(
                      cart.filter((cartItem) => {
                        return item.id !== cartItem.id;
                      })
                    );
                  }}
                >
                  Remove form Cart
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No item in cart</p>
        )}
      </div>
      <h4>Item: {cart.length} item - total Price: ${cart.reduce((prev, cartItem)=>{
            return prev + parseInt(cartItem.price)
      }, 0)}</h4>

      <button className="btn btn-warning">Check out</button>
    </div>
  );
}

export default Carts;
