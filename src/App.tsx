import { useEffect } from 'react';
import './App.scss';
import { useAppDispatch } from './hooks/redux';
import { fetchRates } from './store/slices/rates';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRates());
  }, []);

  return <></>;
}

export default App;
