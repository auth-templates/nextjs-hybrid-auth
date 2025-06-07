import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/time-offs', async ({ request }) => {
        return HttpResponse.json([
            {
                status: 'approved',
                start: 1686581419,
                duration: 3,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }   
            },
            {
                status: 'approved',
                start: 1677858619,
                duration: 2,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }   
            },
            {
                status: 'planned',
                start: 1684162219,
                duration: 1,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'planned',
                start: 1701618619,
                duration: 4,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'applied for',
                start: 1694962219,
                duration: 1,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'approved',
                start: 16949622219,
                duration: 2,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'cancelled',
                start: 1700236219,
                duration: 3,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            }
        ]);
    })
];

export default handlers;