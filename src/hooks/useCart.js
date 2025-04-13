import { useEffect, useState } from 'react'
import { db } from '../data/db.js'

export const useCart = () => {
    
    const initialState = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //State
    const [data] = useState(db);
    const [cart, setCart] = useState(initialState);

    const MIN_ITEMS = 1

    useEffect( () => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

        if (itemExists >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function removeToCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1 
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1 
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    return {
        data,
        cart,
        addToCart,
        removeToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    }
}