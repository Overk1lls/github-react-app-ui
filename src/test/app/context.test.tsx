import { render, screen } from '@testing-library/react';
import { createAxiosClient } from '../../app/axios';
import { getConfig } from '../../app/config';
import AppProvider from '../../app/context';

describe('app/context.tsx', () => {
  test('should handle instantiating', () => {
    render(
      <AppProvider axios={createAxiosClient(getConfig().baseUrl)}>
        <h2>Hello World</h2>
      </AppProvider>
    );
    expect(screen.getByRole('heading', { name: 'Hello World' })).toBeInTheDocument();
  });
});
