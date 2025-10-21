import React from 'react';
import { render, screen } from '@/test-utils';
import { describe, it, expect } from 'vitest';
import AccountContainer from './account';

describe('AccountContainer', () => {
	it('should render the account view', () => {
		render(<AccountContainer />);

		// Check if the Two-Factor Authentication title is rendered
		expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
	});

	it('should render without crashing', () => {
		expect(() => render(<AccountContainer />)).not.toThrow();
	});
});
