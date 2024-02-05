/* eslint-disable import/export */
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {MockedProvider} from '@apollo/client/testing';
import {FormProvider, useForm} from 'react-hook-form';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const AllProviders = ({children}: {children: React.ReactElement}) => (
  <MockedProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </MockedProvider>
);

function renderForm(
  ui: React.ReactElement,
  {initialState = {}, defaultValues = {}, ...renderOptions} = {}
) {
  const Wrapper = ({children}: {children?: React.ReactElement}) => {
    const methods = useForm();
    return (
      <AllProviders>
        <FormProvider {...methods}>{children}</FormProvider>
      </AllProviders>
    );
  };

  return render(ui, {wrapper: Wrapper, ...renderOptions});
}

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: AllProviders,
    ...options,
  });
}
export * from '@testing-library/react';
export {default as userEvent} from '@testing-library/user-event';
// override render export
export {customRender as render, renderForm};
