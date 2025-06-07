import { useState } from 'react';
import classes from './checkbox.module.css';

const Checkbox = (props) => {
    const [checked, setChecked] = useState(false);
    return (
        <div className={classes.container}>
            <input 
                id="checkbox"
                name="checkbox" 
                type="checkbox" 
                onChange={()=> setChecked(!checked)} 
                checked={checked} 
                {...props}/>
            <span 
                className={classes.checkmark} 
                data-testid="checkbox-cover" 
                onClick={() => setChecked(!checked)}
            ></span>
        </div>
    );
}

export default Checkbox;