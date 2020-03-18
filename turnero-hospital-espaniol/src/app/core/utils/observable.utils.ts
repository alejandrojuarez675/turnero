import { of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

const DEFAULT_DELAY = 1000;

export function getWsFromMock(mockup: any, delayMs?: number) {
    delayMs = delayMs ? delayMs : DEFAULT_DELAY;
    return of(mockup).pipe(delay(delayMs));
}
