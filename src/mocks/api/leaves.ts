import { http, HttpResponse } from 'msw';

const DefaultLeaveTypes = {
    PaidTimeOff: 'Paid time off (PTO)',
    UnpaidLeave: 'Unpaid leave',
    PaidVacation: 'Paid vacation',
    SickLeave: 'Sick leave',
    MedicalLeave: 'Medical leave',
    FamilyLeave: 'Family leave',
    ShortTermDisability: 'Short-term disability',
    BereavementLeave: 'Bereavement leave'
}

export const handlers = [
    http.get('/leaves/types', async ({ request }) => {
      return HttpResponse.json([
            {
                id: 0,
                name: 'Paid time off (PTO)'
            },
            {
                id: 1,
                name: 'Unpaid leave'
            },
            {
                id: 2,
                name: 'Paid vacation'
            },
            {
                id: 3,
                name: 'Sick leave',
            },
            {
                id: 4,
                name: 'Medical leave',
            },
            {
                id: 5,
                name: 'Family leave',
            },
            {
                id: 6,
                name: 'Short-term disability',
            },
            {
                id: 7,
                name: 'Bereavement leave'
            }
        ])
    }),
    http.get('/leaves/count', async ({ request }) => {
        return HttpResponse.json([
                {
                    total: 24,
                    lastYear: 3,
                    used: 14
                }
            ]);
    }),
    http.get('/leaves', async ({ request }) => {
        return HttpResponse.json([
            {
                status: 'approved',
                start: 1686581419,
                end: 1687618219,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }   
            },
            {
                status: 'approved',
                start: 1677858619,
                end: 1678117819,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }   
            },
            {
                status: 'planned',
                start: 1684162219,
                end: 1684421419,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'planned',
                start: 1701618619,
                end: 1701877819,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'applied for',
                start: 1694962219,
                end: 1697554219,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'approved',
                start: 1694962219,
                end: 1697554219,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            },
            {
                status: 'cancelled',
                start: 1700236219,
                end: 1700409019,
                approver: {
                    name: 'John Doe',
                    id: '343de2efs'
                }  
            }
        ]);
    })
]

export default handlers;