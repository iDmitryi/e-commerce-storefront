import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../utils/types.ts'

interface ICartProduct extends Partial<IProduct> {
  quantity: number
}

export interface ICartSliceState {
  total: number
  products: ICartProduct[]
}

const initialState: ICartSliceState = {
  total: 0,
  products: []
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    addToCart: create.reducer((state, action: PayloadAction<ICartProduct>) => {
      const productIndex = state.products.findIndex(
        product => product.id === action.payload.id
      )

      if (productIndex !== -1) {
        // Update existing product quantity and total
        state.products[productIndex].quantity += action.payload.quantity
      } else {
        // Add new product and update total
        state.products.push(action.payload)
      }

      state.total += action.payload.quantity
    }),
    removeProduct: create.reducer(
      (state, action: PayloadAction<IProduct['id']>) => {
        const productIndex = state.products.findIndex(
          product => product.id === action.payload
        )

        if (productIndex !== -1) {
          state.total -= state.products[productIndex].quantity
          state.products.splice(productIndex, 1)
        }
      }
    )
  }),

  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectTotal: cart => cart.total,
    selectProducts: cart => cart.products
  }
})

// Action creators are generated for each case reducer function.
export const { addToCart, removeProduct } = cartSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTotal, selectProducts } = cartSlice.selectors
