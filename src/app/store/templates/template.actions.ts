import { createAction, props } from '@ngrx/store';

export const loadTemplates = createAction('[Template] Load Templates');
export const loadTemplatesSuccess = createAction('[Template] Load Templates Success', props<{ templates: any[] }>());
export const addTemplate = createAction('[Template] Add Template', props<{ template: any }>());
export const updateTemplate = createAction('[Template] Update Template', props<{ template: any }>());
export const deleteTemplate = createAction('[Template] Delete Template', props<{ id: string }>());