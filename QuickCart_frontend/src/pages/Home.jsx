import { useEffect, useState } from "react";

export default function Shop(){

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/")
        .then(response => response.json())
        .then(data => {console.log("Fetched data:", data);  // Log the data to the console
                    setData(data)})
        .catch(error => console.error("Error fetching data:", error))
    },[]);

    const fruitImages = {
        apple: "/fruit_images/apple.png",
        banana: "/fruit_images/banana.png",
        orange: "/fruit_images/orange.png",
        grapes: "/fruit_images/grapes.png",
        mango: "/fruit_images/mango.png",
    };

    const addToCart = (fruit) => {
        fetch("http://localhost:8000/add_to_cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ item: fruit })
        })
        .then(response => response.json())
        .then(result => {
            console.log("Added to cart:", result);
        })
        .catch(error => console.error("Error adding to cart:", error));
    };

    return (
        <div>
            <h1>This is Home Page</h1>
            {data ? (
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {Object.entries(data).map(([fruit, details]) => (
                        <div key={fruit} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                            <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={fruitImages[fruit] || "https://via.placeholder.com/100"} alt={fruit} width="100"/>
                            </div>
                            <h3>{fruit.charAt(0).toUpperCase() + fruit.slice(1)}</h3>
                            {/*<p>Stock: {details.stock}</p>*/}
                            <p>Price: ${details.price}</p>
                            <button onClick={() => addToCart(fruit)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
}