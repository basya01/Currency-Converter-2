import React, { ChangeEvent } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Input, Select } from '../UI';

import styles from './CurrencyBlock.module.scss';

interface CurrencyBlockProps {
  value: string;
  currency: string;
  onChangeValue: (value: string) => void;
  onChangeCurrency: (cur: string) => void;
}

export const CurrencyBlock: React.FC<CurrencyBlockProps> = ({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
}) => {
  const { rates } = useAppSelector((state) => state.rates);

  return (
    <div className={styles.root}>
      <Select
        options={Object.keys(rates)}
        value={currency}
        onChangeValue={(cur: string) => {
          onChangeCurrency(cur);
        }}
      />
      <Input
        className={styles.input}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChangeValue(String(+e.target.value));
        }}
      />
    </div>
  );
};
