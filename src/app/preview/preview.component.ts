import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  template: any = null;
  previewForm: FormGroup = this.fb.group({});
  submitted = false;
  formResult: any = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const templateStr = localStorage.getItem('viewTemplate');
    if (templateStr) {
      this.template = JSON.parse(templateStr);
      this.buildForm();
    }
  }

  buildForm(): void {
    if (!this.template) return;
    const group: any = {};
    for (const field of this.template.fields) {
      if (field.type === 'checkbox') {
        group[field.label] = [false];
      } else if (field.type === 'radio') {
        group[field.label] = [''];
      } else if (field.type === 'select') {
        group[field.label] = [''];
      } else {
        group[field.label] = [field.required ? '' : '', field.required ? Validators.required : null];
      }
    }
    this.previewForm = this.fb.group(group);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.previewForm.valid) {
      this.formResult = this.previewForm.value;
    }
    console.log(this.formResult);
  }
}
