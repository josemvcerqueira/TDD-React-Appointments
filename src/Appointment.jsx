import React from 'react';

export const Appointment = ({ customer: { firstName } }) => (
  <div>{firstName}</div>
);
