import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  amount: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increaseAmount: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount = cartItem.amount + 1;
    },
    decreaseAmout: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let itemAmount = 0;
      let itemTotal = 0;
      state.cartItems.forEach((item) => {
        itemAmount += item.amount;
        itemTotal += item.amount * item.price;
      });
      state.amount = itemAmount.toFixed(0);
      state.total = itemTotal.toFixed(2);
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmout,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
