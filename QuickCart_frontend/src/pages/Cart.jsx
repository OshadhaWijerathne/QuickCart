import { useEffect, useState } from "react";

export default function Cart() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = () => {
        fetch("http://localhost:8000/cart_db")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
                setData(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    const clearCart = () => {
        fetch("http://localhost:8000/cart_db", { method: "DELETE" })
            .then(response => response.json())
            .then(result => {
                console.log("Cart cleared:", result);
                setData(null); // Empty the cart in the frontend
            })
            .catch(error => console.error("Error clearing cart:", error));
    };

    const buyCart = () => {
        fetch("http://localhost:8000/buy_cart", { method: "POST" })
            .then(response => response.json())
            .then(result => {
                console.log("Purchase successful:", result);
                setData(null); // Empty the cart after purchase
            })
            .catch(error => console.error("Error purchasing cart:", error));
    };

    return (
        <div>
            <h1>This is Cart Page</h1>
            {data && Object.keys(data).length > 0 ? (
                <>
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data).map(([item, itemDetails]) => (
                                <tr key={item}>
                                    <td>{item.charAt(0).toUpperCase() + item.slice(1)}</td>
                                    <td>${itemDetails.price}</td>
                                    <td>{itemDetails.quantity}</td>
                                    <td>${itemDetails.price*itemDetails.quantity}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" style={{ textAlign: "left", fontWeight: "bold" }}>Grand Total:</td>
                                <td style={{ fontWeight: "bold" }}>
                                    ${Object.values(data).reduce((acc, item) => acc + (item.price * item.quantity), 0)}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Buttons for Clear Cart & Buy */}
                    <div style={{ marginTop: "20px" }}>
                        <button onClick={clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
                        <button onClick={buyCart}>Check out</button>
                    </div>
                </>
            ) : (
                <p>Cart is empty.</p>
            )}
        </div>
    );
}
