from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ShopItem(BaseModel):
    item: str  # Ensures item is always a string

shop_db = {
    "apple": { "price": 10, "stock": 20 },
    "banana": { "price": 8, "stock": 15 },
    "orange": { "price": 12, "stock": 20 },
    "grapes": { "price": 15, "stock": 15 },
    "mango": { "price": 18, "stock": 20 },
}

cart_db = {}
orders_db = {}
#shop methods
@app.get("/")
def show_shop_items():
    return shop_db
#Cart methods
@app.post("/add_to_cart")
def add_item_to_cart_db(item:ShopItem):
    shop_db[item.item]["stock"] -= 1
    if item.item in cart_db:
        cart_db[item.item]["quantity"] += 1
    else:
        cart_db[item.item] = {"quantity": 1, "price": shop_db[item.item]["price"]}   
    return({"message":f"{item.item} added to the cart_db"})

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