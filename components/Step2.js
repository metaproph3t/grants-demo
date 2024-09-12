// components/Step2.js
import React, { useState } from 'react';

<style jsx>{`
  label {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  input[type='range'] {
    margin: 0 10px;
    flex: 1;
  }
  span {
    min-width: 50px;
    text-align: right;
  }
`}</style>


const Step2 = ({ setPrice }) => {
  const [inputPrice, setInputPrice] = useState(0.5);

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    setInputPrice(value);
    setPrice(value);
  };

  return (
    <div>
      <h2>Step 2: Market Trading</h2>
      <p>
        Market participants trade UP and DOWN contracts to predict the Total Value Locked (TVL) for Degen Vault in 3 months.
      </p>
      <label>
        Set UP Contract Price ($0 - $1):
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={inputPrice}
          onChange={handleChange}
        />
        <span>{` $${inputPrice.toFixed(2)}`}</span>
      </label>
      <p>
        Current Market Prediction: Degen Vault will have <strong>${(inputPrice * 10).toFixed(2)}M</strong> in TVL.
      </p>
    </div>
  );
};

export default Step2;

