import classes from './terms-and-conditions.module.css';
import Checkbox from '../../../checkbox';

const TermsAndConditions = () => {
    return (
        <div className={classes.termsAndConditions}>
            <Checkbox required/> 
            <div>I agree with the <a href="/terms-and-conditions">terms and conditions</a>.</div>
        </div>
    );
}

export default TermsAndConditions;