import { Input } from '@mantine/core';
import classes from './details.module.css';

const Details = (props) => {
    return (
        <div className={classes.details}>
            <div className={classes.group}>
                <label htmlFor='firstname'>First name (optional)</label>
                <Input 
                    id="firstname"  
                    name="firstname"
                />
            </div>
            <div className={classes.group}>
                <label htmlFor='lastname'>Last name (optional)</label>
                <Input 
                    id="lastname"  
                    name="lastname"
                />
            </div>
            <div className={classes.group}>
                <label htmlFor='company'>Company (optional)</label>
                <Input 
                    id="company"  
                    name="company"
                />  
            </div>
        </div>
    )
}

export default Details;