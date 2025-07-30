import { handlers as authHandlers }  from './api/auth';
import { handlers as csrfHandlers } from './api/csrf';

export const handlers = [
    ...csrfHandlers, 
    ...authHandlers,
]
