from fastapi import FastAPI
import uvicorn
#from pydantic import BaseModel

app = FastAPI()

shop_db = {
    "apple": 10,
    "banana": 8,
    "orange": 12,
    "grapes": 20,
    "mango": 30
}

cart_db = {}
orders_db = {}
#shop methods
@app.get("/")
def show_shop_items():
    return shop_db
#Cart methods
@app.post("/add_to_cart")
def add_item_to_cart_db(item:str):
    if item in cart_db:
        cart_db[item] += 1
    else:
        cart_db[item] = 1    
    return({"message":"item added to the cart_db"})

@app.get("/cart_db")
def show_item_in_cart_db():
    return cart_db

@app.delete("/cart_db")
def clear_cart_db():
    cart_db.clear()
    return ({"message": "cart_db cleared"})

@app.delete("/cart_db/{item}")
def remove_item_from_cart_db(item:str):
    cart_db.pop(item)
    return ({"message": "item removed from the cart_db"})

#Orders methods
@app.post("/buy_cart")
def buy_cart():
    if not cart_db:
        return({"message": "cart is empty"})
    order_id = len(orders_db) + 1
    orders_db[order_id] = cart_db.copy()
    cart_db.clear()
    print(orders_db)
    return ({"message": "cart items ordered"})


if __name__ == "__main__":
    uvicorn.run("shop:app",reload=True)