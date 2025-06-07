
export async function getCaptcha(): Promise<any> {
    return await fetch('/auth/captcha');
}
