import { createReducer, on } from '@ngrx/store';
import * as TemplateActions from './template.actions';

export interface TemplateState {
  templates: any[];
}

export const initialState: TemplateState = {
  templates: []
};

export const templateReducer = createReducer(
  initialState,
  on(TemplateActions.loadTemplatesSuccess, (state, { templates }) => ({ ...state, templates })),
  on(TemplateActions.addTemplate, (state, { template }) => ({ ...state, templates: [...state.templates, template] })),
  on(TemplateActions.updateTemplate, (state, { template }) => ({
    ...state,
    templates: state.templates.map(temp => temp.id === template.id ? template : temp)
  })),
  on(TemplateActions.deleteTemplate, (state, { id }) => ({
    ...state,
    templates: state.templates.filter(template => template.id !== id)
  }))
);
