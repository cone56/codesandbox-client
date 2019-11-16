import React, { ChangeEvent, FunctionComponent } from 'react';

import { Input } from './elements';

type Props = {
  setValue: (value: number) => void;
  step?: number;
  value: number;
  style?: any;
};

export const PreferenceNumber: FunctionComponent<Props> = ({
  setValue,
  step,
  style,
  value,
}) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(+target.value)) {
      setValue(+target.value);
    }
  };

  return (
    <Input
      onChange={handleChange}
      step={step}
      style={{ width: '3rem', ...style }}
      type="number"
      value={value}
    />
  );
};
