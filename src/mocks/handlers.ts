import billingHandlers from './api/billing';
import authHandlers from './api/auth';
import leaveHandlers from './api/leaves';
import timeOffHandlers from './api/time-offs';

export const handlers = [
    ...billingHandlers,
    ...authHandlers,
    ...leaveHandlers,
    ...timeOffHandlers
]