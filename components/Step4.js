// components/Step4.js
import React from 'react';

const Step4 = ({ decision }) => (
  <div>
    <h2>Step 4: Post-Decision Process</h2>
    {decision === 'reject' ? (
      <p>
        The grant was rejected. All traders receive their money back.
      </p>
    ) : (
      <p>
        The grant was accepted. Markets remain open until the project is completed.
      </p>
    )}
  </div>
);

export default Step4;

