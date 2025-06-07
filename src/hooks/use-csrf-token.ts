import { useRef, useEffect } from 'react';
import { getCsrfToken } from '../api/client/csrf';

const useCsrfToken = () => {
    const csrfToken = useRef(); 
    const fetchCsrfToken = async () => {
        const response = await getCsrfToken();
        try {
            if ( response.ok ) {
                csrfToken.current = (await response.json()).csrfToken;
            }       
        } catch (error) {
        }
    };
    
    useEffect(() => {
        fetchCsrfToken();
    }, [])

    return async () => { 
        if ( !csrfToken.current ) {
            await fetchCsrfToken();
        }
        return csrfToken.current;
    };
}

export default useCsrfToken;