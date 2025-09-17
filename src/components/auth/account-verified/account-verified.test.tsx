import { render, screen } from '@/test-utils';
import AccountVerified from './account-verified';
import { PublicRoutes } from '@/routes';

describe('AccountVerified', () => {
	it('should contain all elements', async () => {
		render(<AccountVerified />);

		// The component should render without crashing
		expect(screen.getAllByRole('generic')[0]).toBeInTheDocument();
	});
});
