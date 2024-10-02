import React from 'react';
import { useCart } from 'react-use-cart';
import CartVuoto from '../assets/carrello-vuoto.gif'
import '../css/ShopCart.css'
const ShopCart = () => {
    const { 
        isEmpty, 
        totalUniqueItems, 
        items, 
        totalItems, 
        cartTotal, 
        updateItemQuantity, 
        removeItem, 
        emptyCart 
    } = useCart();

    if (isEmpty) return <div className="cart-vuoto"> <img 
    src={CartVuoto} 
    alt="Empty cart" 
    style={{ width: '35vh', height:"25vh", marginTop: '30px' }} 
/></div>

    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h5>Cart: ({totalUniqueItems}) Total items: ({totalItems})</h5>
                    <table className="Table-cart table table-light table-hover mt-5">
                        <thead>
                            <tr className="th-title text-center">
                                <th>Immagine</th>
                                <th>Sneakers</th>
                                <th>Prezzo</th>
                                <th>Quantità</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr className="text-center" key={index}>
                                    <td>
                                        <img src={item.img} style={{ height: '50px' }} alt={item.title} />
                                    </td>
                                    <td className="fw-bold">{item.title}</td>
                                    <td className="fw-bold">${item.price}</td> 
                                    <td><button className="btn-shop me-2"
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)} 
                                            disabled={item.quantity === 1} 
                                        >
                                            -
                                        </button> {item.quantity}  <button className="btn-shop ms-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button> </td> 
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <h5>Total: ${cartTotal.toFixed(2)}</h5> 
                    <button onClick={emptyCart} className="btn btn-danger">Svuota il Carrello</button>
                </div>
            </div>
        </section>
    );
};

export default ShopCart;





















/* const ShopCart = () => {
  const [carts, setCarts] = useState([]);

  const addToCart = (scarpe_id) => {
    const positionThisProductInCart = carts.findIndex(
      (item) => item.scarpe_id === scarpe_id
    );

    if (carts.length <= 0) {
   
      setCarts([{ scarpe_id: scarpe_id, quantity: 1 }]);
    } else if (positionThisProductInCart < 0) {
      
      setCarts([...carts, { scarpe_id: scarpe_id, quantity: 1 }]);
    } else {
      
      const updatedCarts = carts.map((item, index) =>
        index === positionThisProductInCart
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCarts(updatedCarts);
    }
  };

  return (
    <div>
      <h3>Carrello</h3>
      <ul>
        {carts.map((item, index) => (
          <li key={index}>
            Scarpe ID: {item.scarpe_id}, Quantità: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};*/

