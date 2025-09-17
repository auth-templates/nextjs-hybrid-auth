import React from 'react';
import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import AccountContainer from './account';

describe('AccountContainer', () => {
	it('should render the account view', () => {
		render(<AccountContainer />);

		// Check if the account view container is rendered
		const accountView = screen.getByTestId('account-view');
		expect(accountView).toBeInTheDocument();
		expect(accountView).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<AccountContainer />)).not.toThrow();
	});
});
