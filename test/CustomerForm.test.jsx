import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { CustomerForm } from '../src/CustomerForm';

import { createContainer } from './dom-manipulators';

describe('CustomerForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const field = (name, formFn = form) => formFn('customer').elements[name];

  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  const itRendersAsATextBox = fieldName =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expectToBeInputFieldOfTypeText(field(fieldName));
      expect(field(fieldName).value).toEqual('value');
    });

  const itRendersALabel = (htmlFor, value) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(htmlFor)).not.toBeNull();
      expect(labelFor(htmlFor).textContent).toEqual(value);
    });

  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('it assigns an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSavesExistingValue = (key, value) =>
    it('saves existing first name when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [key]: value }}
          onSubmit={props => expect(props[key]).toEqual(value)}
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  const itSubmitsNewValue = (key, value) =>
    it('saves new first name when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [key]: 'previousValue' }}
          onSubmit={props => expect(props[key]).toEqual(value)}
        />
      );
      await ReactTestUtils.Simulate.change(field(key), {
        target: { value, name: key }
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSavesExistingValue('firstName', 'Ashley');
    itSubmitsNewValue('firstName', 'Jordan');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSavesExistingValue('lastName', 'Vee');
    itSubmitsNewValue('lastName', 'Jose');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSavesExistingValue('phoneNumber', '123123');
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton.value).toMatch('Add');
  });
});
