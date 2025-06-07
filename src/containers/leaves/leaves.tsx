'use client'

import LeavesContainer from '../containers/leaves/leaves';
import TimeOffsContainer from '../containers/time-offs';
import classes from './leaves.module.css';

export default function LeavesContainer(){
    return (
        <div className={classes.viewAllView}>
            <h1>History</h1>
            <LeavesContainer />
            <TimeOffsContainer />
        </div>
    )
}