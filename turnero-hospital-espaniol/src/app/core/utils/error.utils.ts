export class ErrorUtils {

    static listGenericErrors = [
        'Http failure response for (unknown url): 0 Unknown Error',
    ];

    static getFormatedError = (error: string): string => {
        let result = error;

        if (ErrorUtils.listGenericErrors.indexOf(error) !== -1) {
            result = 'Ha ocurrido un error, reintente nuevamente más tarde.';
        }

        return result;
    }

}
