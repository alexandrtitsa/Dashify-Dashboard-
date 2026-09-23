import React, { useState } from 'react';
import styles from './CurrencyWidget.module.scss';

const RATES: Record<string, number> = {
  USD: 41.2,
  EUR: 45.1,
  GBP: 53.4,
};

export const CurrencyWidget: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [currency, setCurrency] = useState<string>('USD');

  const convertedUah = (amount * (RATES[currency] || 0)).toFixed(2);

  return (
    <div className={styles.currencyContainer}>
      <div className={styles.rateList}>
        {Object.entries(RATES).map(([code, rate]) => (
          <div key={code} className={styles.rateRow}>
            <span className={styles.rateRowCode}>{code} / UAH</span>
            <span className={styles.rateRowValue}>{rate.toFixed(2)} ₴</span>
          </div>
        ))}
      </div>

      <div className={styles.converter}>
        <div className={styles.converterInputs}>
          <input
            type="number"
            className={styles.input}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
          />
          <select
            className={styles.select}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.keys(RATES).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.resultText}>
          ≈ <strong>{convertedUah}</strong> UAH
        </div>
      </div>
    </div>
  );
};