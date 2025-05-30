import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TemplateState } from './template.reducer';

export const selectTemplateState = createFeatureSelector<TemplateState>('template');
export const selectAllTemplates = createSelector(selectTemplateState, state => state.templates);
