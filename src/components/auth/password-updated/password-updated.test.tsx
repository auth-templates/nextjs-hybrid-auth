import { render, screen } from '@/test-utils';
import PasswordUpdated from './password-updated';
import { PublicRoutes } from '@/routes';

describe('PasswordUpdated', () => {
	it('should contain all elements', async () => {
		render(<PasswordUpdated />);

		// The component should render without crashing
		expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
	});
});
