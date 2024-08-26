export enum Routes {

    default = '/',
    signin = 'auth/signin',
    home = '/',
    signup = 'auth/signup',
    auth='/auth'
}
export const goTo = (route: string, param: string | number) => {
    return route + '/' + param;
}
export const goToWithQuery = (route: string, param: any) => {
    let path = route + '?';
    if (param) {
        for (const key in param) {
            if (path.substr(path.length - 1) !== '?')
                path += '&';
            path += key + '=' + param[`${key}`]
        }
        return path;
    }
}