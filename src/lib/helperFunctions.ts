export const isStringEmpty = (str: string): boolean => {
    if(str === null || str === undefined) {
        return true;
    }
    
    return str.trim() === '';
}