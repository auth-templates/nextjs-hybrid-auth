import { handlers as billingHandlers } from './api/billing';
import { handlers as authHandlers }  from './api/auth';
import { handlers as leaveHandlers } from './api/leaves';
import { handlers as timeOffHandlers } from './api/time-offs';
import { handlers as csrfHandlers } from './api/csrf';

export const handlers = [
    ...csrfHandlers, 
    ...billingHandlers,
    ...authHandlers,
    ...leaveHandlers,
    ...timeOffHandlers
]