import Captcha from "./captcha";
import { getCaptcha } from '@/api/client/captcha';
import { useEffect, useState } from "react";

export default function CaptchaContainer() {
    const [ image, setImage ] = useState<string|null>();
    
    useEffect(() => {
        getCapchaImage();
    }, [])

    const getCapchaImage = async () => {
  
        try {
            const response = await getCaptcha();
            const data = await response.text();
            setImage(data);
        } catch(error) {

        }
    }

    const onRefresh = () => {
        setImage(null);
        getCapchaImage();
    }

    return (
        <>
            <Captcha image={image} onRefresh={onRefresh}/>
        </>
    );
}