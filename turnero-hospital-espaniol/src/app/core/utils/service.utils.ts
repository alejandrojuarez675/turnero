import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

const DEFAULT_DELAY = 1000;

export function getWsFromMock(mockup: any, delayMs?: number) {
    delayMs = delayMs ? delayMs : DEFAULT_DELAY;
    return of(mockup).pipe(delay(delayMs));
}

export function throwErrorToUser(msj: any) {
    throw new Error(`${msj}`);
}

export function throwErrorIfBadCode(res: any) {
    if (res.respuesta.codigo !== 200) {
      throw new Error(`${res.respuesta.codigo} - ${res.respuesta.mensaje}`);
    }
}
