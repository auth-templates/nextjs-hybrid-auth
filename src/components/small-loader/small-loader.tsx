import classes from './small-loader.module.css';
import classNames from 'classnames';

export default function PendingButton({className}:{className?: string}) {
    return (
        <div className={classNames(classes.ldsRing, className)} data-testid="small-lds-ring">
            <div>
            </div>
            <div>
            </div>
        </div>
    );
}