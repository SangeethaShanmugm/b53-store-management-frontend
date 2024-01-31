import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { API } from '../global'
import Item from './Item'

function Home() {
    const [itemData, setItemData] = useState([])


    const cartItems = useSelector((state) => state.itemShop.cartItems)

    console.log(cartItems)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${API}/items/get-items`)
            .then((res) => {
                setItemData(res.data)
            })
    }, [])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    return (
        <div>
            <button type="button" class="btn btn-primary position-relative"
                onClick={() => navigate("/cart")}>
                Cart
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}

                </span>
            </button>

            <div className='item-display'>
                {itemData.map((item) => (
                    <Item key={item._id} item={item} />
                ))}
            </div>

        </div>

    )
}

export default Home