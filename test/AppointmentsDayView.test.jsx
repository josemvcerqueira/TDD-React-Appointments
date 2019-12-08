import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { at } from '../src/sampleData';
import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView';

import { createContainer } from './dom-manipulators';

describe('Appointment', () => {
  let container, render;
  const customer = {
    firstName: 'Ashley',
    lastName: 'Bert',
    phoneNumber: '123123123',
    stylist: 'Josef',
    service: 'Blow-dry',
    notes: 'random notes',
    startsAt: at(12)
  };

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('renders the customer last name', () => {
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch(customer.lastName);
  });

  it('renders the customer phone number', () => {
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch(customer.phoneNumber);
  });

  it('renders the stylist', () => {
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch(customer.stylist);
  });

  it('renders the service', () => {
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch(customer.service);
  });

  it('renders the notes', () => {
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch(customer.notes);
  });

  it('renders the appointment heading with the time', () => {
    render(<Appointment customer={customer} />);
    expect(container.querySelector('div > h3').textContent).toMatch('12:00');
  });
});

describe('AppointmentsDayView', () => {
  let container, render;
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley', lastName: 'Bert' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan', lastName: 'Vee' }
    }
  ];

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch(appointments[0].customer.lastName);
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll('li > button')).toHaveLength(2);
    expect(container.querySelectorAll('li>button')[0].type).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch(appointments[1].customer.lastName);
  });
});
