import { createAction, props } from '@ngrx/store';

export const SHOW_ERROR = '[ERROR] - Show Error';
export const CLEAN_ERROR = '[ERROR] - Clean Error';

export const showError = createAction(
    SHOW_ERROR,
    props<{ error: string }>()
);

export const cleanError = createAction(
    CLEAN_ERROR,
    props<{ error: string }>()
);
