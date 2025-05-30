import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllTemplates } from '../store/templates/template.selectors';
import * as TemplateActions from '../store/templates/template.actions';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  role: string = '';
  templates: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

  ngOnInit() {
    this.role = this.route.snapshot.url[0].path;
    const templates = JSON.parse(localStorage.getItem('formTemplates') || '[]');
    this.store.dispatch(TemplateActions.loadTemplatesSuccess({ templates }));
    this.store.select(selectAllTemplates).subscribe(templates => {
      this.templates = templates as any[];
    });
  }

  editTemplate(idx: number): void {
    localStorage.setItem('editTemplate', JSON.stringify(this.templates[idx]));
    this.router.navigate(['/form-builder']);
  }

  deleteTemplate(id: string): void {
    if (confirm('Are you sure you want to delete this template?')) {
      this.store.dispatch(TemplateActions.deleteTemplate({ id }));
    }
  }

  viewTemplate(idx: number): void {
    localStorage.setItem('viewTemplate', JSON.stringify(this.templates[idx]));
    this.router.navigate(['/preview']);
  }

  addTemplate(template: any) {
    this.store.dispatch(TemplateActions.addTemplate({ template }));
  }

  updateTemplate(template: any) {
    this.store.dispatch(TemplateActions.updateTemplate({ template }));
  }
}
