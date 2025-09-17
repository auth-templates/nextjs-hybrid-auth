import { render, screen, userEvent } from '@/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MessageBox from './message-box';

describe('MessageBox', () => {
	it('should render messages', () => {
		const messages = [
			{ text: 'Test message 1', severity: 'info' as const },
			{ text: 'Test message 2', severity: 'error' as const },
		];

		render(<MessageBox messages={messages} />);

		expect(screen.getByText('Test message 1')).toBeInTheDocument();
		expect(screen.getByText('Test message 2')).toBeInTheDocument();
	});

	it('should render single message', () => {
		const messages = [{ text: 'Single message', severity: 'success' as const }];

		render(<MessageBox messages={messages} />);

		expect(screen.getByText('Single message')).toBeInTheDocument();
	});

	it('should handle close button click', async () => {
		const messages = [{ text: 'Test message', severity: 'info' as const }];
		const onClose = vi.fn();

		render(<MessageBox messages={messages} onClose={onClose} />);

		const closeButton = screen.getByRole('button');
		await userEvent.click(closeButton);

		expect(onClose).toHaveBeenCalled();
	});

	it('should render without crashing', () => {
		const messages = [{ text: 'Test message', severity: 'info' as const }];
		expect(() => render(<MessageBox messages={messages} />)).not.toThrow();
	});
});
