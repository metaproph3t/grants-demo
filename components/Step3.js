// components/Step3.js
import React from 'react';

const Step3 = ({ averagePrice }) => {
  const decision = averagePrice >= 0.5 ? 'accept' : 'reject';
  return (
    <div>
      <h2>Step 3: Grant Decision</h2>
      <p>
        After 3 days, the time-weighted average price of UP contracts is <strong>${averagePrice.toFixed(2)}</strong>.
      </p>
      <p>
        The grant is <strong>{decision === 'accept' ? 'ACCEPTED' : 'REJECTED'}</strong>.
      </p>
    </div>
  );
};

export default Step3;

