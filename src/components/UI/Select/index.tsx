import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './Select.module.scss';

interface SelectProps {
  className?: string;
  value: string;
  options: string[];
  onChangeValue: (cur: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  className,
  value,
  options,
  onChangeValue,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const optionHandler = (option: string) => {
    setIsVisible(false);
    onChangeValue(option);
  };

  return (
    <div className={clsx(styles.root, className && className)}>
      <button
        className={styles.button}
        onClick={() => setIsVisible(!isVisible)}
      >
        {value}
      </button>
      {isVisible && (
        <div className={styles.optionsBlock}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter currency"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <ul className={styles.options}>
            {options
              .filter((option) => option.includes(searchValue.toUpperCase()))
              .map((option) => (
                <li
                  key={option}
                  className={styles.option}
                  onClick={() => optionHandler(option)}
                >
                  {option}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
