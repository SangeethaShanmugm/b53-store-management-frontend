import React from 'react'
import { Card, Button } from "antd"
import { useDispatch } from "react-redux"
import { addToCart } from '../redux/itemSlice'


const { Meta } = Card

function Item({ item }) {
    const dispatch = useDispatch()

  


    const handleAddCart = (item) => {
        console.log("Added to Cart")
        dispatch(addToCart(item))
    }
    return (
        <div>
            <Card hoverable style={{ width: 250, marginTop: "50px" }} cover={<img style={{ width: "100%", height: "250px", objectFit: "contain" }} src={item.image} alt={item.name} />}>
                <Meta title={item.name} />
                <h4>Price: Rs. {item.price} </h4>
                <Button type="primary" onClick={() => handleAddCart(item)}>Add to Cart</Button>
            </Card>
        </div>
    )
}

export default Item