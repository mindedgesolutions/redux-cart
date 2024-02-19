import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { nanoid } from "nanoid";
import { calculateTotals } from "../features/cart/cartSlice";
import Modal from "../components/Modal";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, amount, total } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <section className="cart">
      {amount === "0" ? (
        <>
          <header>
            <h2>Your bag</h2>
            <h4 className="empty-cart">is currently empty</h4>
          </header>
        </>
      ) : (
        <>
          <header>
            <h2>Your bag</h2>
          </header>
          <div>
            {cartItems.map((item) => {
              return <CartItem key={nanoid()} {...item} />;
            })}
          </div>
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                Total <span>${total}</span>
              </h4>
            </div>
            <button
              type="button"
              className="btn clear-btn"
              onClick={() => dispatch(openModal())}
            >
              Clear cart
            </button>
          </footer>
        </>
      )}
      {isOpen && <Modal />}
    </section>
  );
};

export default CartContainer;
