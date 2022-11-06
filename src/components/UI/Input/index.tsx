import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      type="text"
      {...props}
      className={clsx(styles.root, className && className)}
    />
  );
};
