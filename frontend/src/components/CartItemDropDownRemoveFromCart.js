import "./CartItemDropDown.css"


const CartItemDropDownRemoveFromCart = ({ productID, orderCreated, quantity, price, removeFromCartHandler = false }) => {



    return (

         <i 
         onClick={removeFromCartHandler ? () => removeFromCartHandler(productID, quantity, price) : undefined}         
         className="bi bi-trash my-trash-icon"/>  

    )
}

export default CartItemDropDownRemoveFromCart;
