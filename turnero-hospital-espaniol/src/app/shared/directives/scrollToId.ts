import { timer } from 'rxjs';

export const scrollToId = (id: string) => timer(50).subscribe(() => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView();
    }
});
