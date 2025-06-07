import classes from './captcha.module.css';
import SmallLoader from '../../small-loader';
import { Button, Input } from '@mantine/core';

type CatpchaProps = {
    image?: string|null,
    onRefresh?: () => void
}

export default function Captcha({ image, onRefresh }: CatpchaProps) {
    return (
        <div className={classes.captcha}>
            <div className={classes.captchaWraper}>
                <div className={classes.captchaImage}>
                    { 
                        image ? 
                            <img src={image} />
                        :
                            <SmallLoader />
                    }
                </div>
                <Button onClick={(e: any) => {e.preventDefault(); onRefresh && onRefresh()}}> Refresh </Button>
            </div>
            <Input 
                id="captcha" 
                name="catcha" 
                placeholder="Enter captcha" 
                required
            />
        </div>
    );
}