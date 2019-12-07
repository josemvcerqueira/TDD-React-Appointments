import React, { useState } from 'react';

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');
  return `${h}:${m}`;
};

export const Appointment = ({ customer: { firstName } }) => (
  <div>{firstName}</div>
);

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, index) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(index)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length ? (
        <Appointment {...appointments[selectedAppointment]} />
      ) : (
        <p>There are no appointments scheduled for today.</p>
      )}
    </div>
  );
};
