import { useEffect, useState } from 'react';
import './App.scss';
import { CurrencyBlock } from './components/CurrencyBlock';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Currency } from './models/Currency';
import { fetchRates } from './store/slices/rates';

function App() {
  const { rates } = useAppSelector((state) => state.rates);
  const dispatch = useAppDispatch();

  const [fromCurrency, setFromCurrency] = useState<Currency>({
    value: '0',
    currency: 'USD',
  });
  const [toCurrency, setToCurrency] = useState<Currency>({
    value: '0',
    currency: 'UAH',
  });

  useEffect(() => {
    dispatch(fetchRates());
  }, []);

  const onChangeFromCurrency = (currency: string) => {
    setFromCurrency(({ value }) => ({ value, currency }));
    
    setToCurrency({
      value:
        String((rates[toCurrency.currency] / rates[currency]) * +fromCurrency.value),
      currency: toCurrency.currency,
    });
  };
  const onChangeFromValue = (value: string) => {
    setFromCurrency(({ currency }) => ({ value, currency }));
    setToCurrency({
      value:
        String((rates[toCurrency.currency] / rates[fromCurrency.currency]) * +value),
      currency: toCurrency.currency,
    });
  };
  const onChangeToCurrency = (currency: string) => {
    setToCurrency(({ value }) => ({ value, currency }));
    setFromCurrency({
      value:
        String((rates[currency] / rates[fromCurrency.currency]) * +toCurrency.value),
      currency: fromCurrency.currency,
    });
  };
  const onChangeToValue = (value: string) => {
    setToCurrency(({ currency }) => ({ value, currency }));
    setFromCurrency({
      value:
        String((rates[fromCurrency.currency] / rates[toCurrency.currency]) * +value),
      currency: fromCurrency.currency,
    });
  };

  return (
    <>
      <CurrencyBlock
        value={fromCurrency.value}
        currency={fromCurrency.currency}
        onChangeValue={onChangeFromValue}
        onChangeCurrency={onChangeFromCurrency}
      />
      <CurrencyBlock
        value={toCurrency.value}
        currency={toCurrency.currency}
        onChangeValue={onChangeToValue}
        onChangeCurrency={onChangeToCurrency}
      />
    </>
  );
}

export default App;
