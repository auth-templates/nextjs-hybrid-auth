import classes from './verify-account.module.css';
import React, { useEffect, useState } from 'react';
import SmallLoader from '../../small-loader';
import MessageBox from '../../message-box';
import ConfirmationEmailExpired from '../confirmation-email-expired';
import AccountVerified from '../account-verified';

type VerifyAccountProps = {
    status: {
        theme: string, 
        lines: string[]
    },
}

export default function VerifyAccount({status}: VerifyAccountProps) {
    const [accountVerified, setAccountVerified] = useState(false);
    const [ expiredToken, setExpiredToken ] = useState(false);
    const [ statusData, setStatus ] = useState< {
        theme: string, 
        lines: string[]
    }>();
    const [ pending, setPending ] = useState(true);

    useEffect(() => {
        if ( status && status.lines.length > 0 ) {
            status.lines[0] === 'Account verified' && setAccountVerified(true);
            status.lines[0] === 'Confirmation token is not valid' && setExpiredToken(true);
        }
        if(status) {
            setPending(false);
        }
        setStatus(status);
    }, [status])

    return (
        <div className={classes.verifyAccount}>
            {
                pending 
                    ?
                        <SmallLoader className={classes.smallLoader} />
                    :
                accountVerified 
                    ?
                        <AccountVerified />
                    :
                expiredToken
                    ?
                        <ConfirmationEmailExpired />
                    :
                statusData && <MessageBox data={statusData}/>
            } 
        </div>
    );
}