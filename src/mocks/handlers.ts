import billingHandlers from './api/billing';
import authHandlers from './api/auth';
import leaveHandlers from './api/leaves';
import timeOffHandlers from './api/time-offs';
import { getFlexibleLeavesAPIMock } from '@/api/generated/flexibleLeavesAPI.msw';

export const handlers = [
    ...getFlexibleLeavesAPIMock(),
    ...billingHandlers,
    ...authHandlers,
    ...leaveHandlers,
    ...timeOffHandlers
]