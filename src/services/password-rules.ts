
import { passwordStrength } from 'check-password-strength';

export const validatePassword = (password: string) => {
    const result = passwordStrength(password);    
    return result.value === 'Medium' || result.value === 'Strong';
}

export const PasswordRulesText = 'You password should be at least 8 characters long and it should contain at least one lowercase character, one uppercase character, one symbol and one number.'; 
