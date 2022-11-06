import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Rates = Record<string, number>;

export interface RatesData {
  table: string;
  rates: Rates;
  lastupdate: string;
}

interface RatesState {
  rates: Rates;
  status: Status;
}

const API_URL = process.env.REACT_APP_API_URL;

const initialState: RatesState = {
  rates: {},
  status: Status.PENDING,
};

export const fetchRates = createAsyncThunk<Rates>(
  'rates/fetchRates',
  async () => {
    if(!API_URL) {
      throw new Error('API_URL Not Found');
    }

    const { data } = await axios.get<RatesData>(API_URL);

    return data.rates;
  }
);

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.rates = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchRates.pending, (state) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.status = Status.ERROR;
      });
  },
});

export default ratesSlice.reducer;
