// components/Step5.js
import React from 'react';

const Step5 = ({ finalTVL }) => {
  const upPayout = (finalTVL * 0.1).toFixed(2);
  const downPayout = (1 - finalTVL * 0.1).toFixed(2);

  return (
    <div>
      <h2>Step 5: Payout Distribution</h2>
      <p>
        After 3 months, Degen Vault has a TVL of <strong>${finalTVL}M</strong>.
      </p>
      <p>
        UP holders receive <strong>${upPayout}</strong> per contract.
      </p>
      <p>
        DOWN holders receive <strong>${downPayout}</strong> per contract.
      </p>
    </div>
  );
};

export default Step5;

