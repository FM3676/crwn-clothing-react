// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
// import { CartContext } from "../../contexts/cart.context";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import {setIsCartOpen} from '../../store/cart/cart.action'
// import "./cart-icon.styles.scss";

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon/>
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
