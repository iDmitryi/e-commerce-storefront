import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../../utils/types.ts'

interface IFavouriteProduct extends Partial<IProduct> {}

export interface IFavouriteSliceState {
  total: number
  products: IFavouriteProduct[]
}

const initialState: IFavouriteSliceState = {
  total: 0,
  products: []
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const favouriteSlice = createSlice({
  name: 'favourite',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    addToFavourites: create.reducer(
      (state, action: PayloadAction<IFavouriteProduct>) => {
        const productIndex = state.products.findIndex(
          product => product.id === action.payload.id
        )

        if (productIndex !== -1) {
          // Update existing product quantity and total
        } else {
          // Add new product and update total
          state.products.push(action.payload)
        }

        state.total = state.products.length
      }
    ),
    removeProduct: create.reducer(
      (state, action: PayloadAction<IProduct['id']>) => {
        const productIndex = state.products.findIndex(
          product => product.id === action.payload
        )

        if (productIndex !== -1) {
          state.products.splice(productIndex, 1)
          state.total = state.products.length
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
export const { addToFavourites, removeProduct } = favouriteSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTotal, selectProducts } = favouriteSlice.selectors
