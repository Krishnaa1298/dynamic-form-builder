import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

interface FormField {
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { label: string; value: string }[];
  selectedValues?: string[];
  selectedValue?: string;
}

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  createdBy: string;
  createdAt: Date;
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild('fieldConfigDialog') fieldConfigDialog!: ElementRef;
  @ViewChild('saveFormDialog') saveFormDialog!: ElementRef;
  
  fieldTypes: FormField[] = [
    { type: 'text', label: 'Text Input', placeholder: 'Enter text', required: false },
    { type: 'textarea', label: 'Text Area', placeholder: 'Enter text', required: false },
    { type: 'number', label: 'Number Input', placeholder: 'Enter number', required: false },
    { type: 'date', label: 'Date Input', required: false },
    { type: 'select', label: 'Select', required: false, options: [] },
    { type: 'checkbox', label: 'Checkbox', required: false },
    { type: 'radio', label: 'Radio Button', required: false }
  ];

  formFields: FormField[] = [];
  currentField: FormField | null = null;
  fieldConfigForm: FormGroup;
  saveFormTemplate: FormGroup;
  editIndex: number | null = null;
  editableTemplate: any;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.fieldConfigForm = this.fb.group({
      type: ['', Validators.required],
      label: ['', Validators.required],
      placeholder: [''],
      required: [false],
      options: this.fb.array([])
    });

    this.saveFormTemplate = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const editTemplateStr = localStorage.getItem('editTemplate');
    if (editTemplateStr) {
      this.editableTemplate = JSON.parse(editTemplateStr);
      this.formFields = this.editableTemplate.fields || [];
      this.saveFormTemplate.patchValue({
        id: this.editableTemplate.id,
        name: this.editableTemplate.name,
        description: this.editableTemplate.description
      });
      localStorage.removeItem('editTemplate');
    }
  }

  get optionsArray() {
    return this.fieldConfigForm.get('options') as FormArray;
  }

  getFieldIcon(type: string): string {
    const icons: { [key: string]: string } = {
      text: 'bi-input-cursor-text',
      textarea: 'bi-textarea-t',
      number: 'bi-123',
      date: 'bi-calendar',
      select: 'bi-list-ul',
      checkbox: 'bi-check-square',
      radio: 'bi-circle'
    };
    return icons[type] || 'bi-question-circle';
  }

  onFieldDropped(event: CdkDragDrop<FormField[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const field = { ...event.item.data };
      this.openFieldConfigDialog(field,'new');
    }
  }
  onCheckboxChange(fieldIndex: number, value: string, checked: boolean) {
    const field = this.formFields[fieldIndex];
    if (!Array.isArray(field.selectedValues)) {
      field.selectedValues = [];
    }
    if (checked) {
      (field.selectedValues as string[]).push(value);
    } else {
      field.selectedValues = (field.selectedValues as string[]).filter((v: string) => v !== value);
    }
  }

  onRadioChange(fieldIndex: number, value: string) {
    this.formFields[fieldIndex].selectedValue = value;
  }
  openFieldConfigDialog(field: FormField, type: string, index?: number): void {
    this.currentField = { ...field };
    this.editIndex = type === 'edit' && typeof index === 'number' ? index : null;
    this.fieldConfigForm.patchValue({
      type: field.type,
      label: type === 'new' ? '' : field.label,
      placeholder: type === 'new' ? '' : field.placeholder || '',
      required: type === 'new' ? false : field.required
    });

    if (field.type === 'select' || field.type === 'checkbox' || field.type === 'radio') {
      this.optionsArray.clear();
      field.options?.forEach(option => {
        this.addOption(option);
      });
    }

    this.modalService.open(this.fieldConfigDialog, { size: 'lg' });
  }

  closeDialog(): void {
    this.modalService.dismissAll();
    this.currentField = null;
    this.fieldConfigForm.reset();
    this.optionsArray.clear();
    this.editIndex = null;
  }

  addOption(option?: { label: string; value: string }): void {
    const optionGroup = this.fb.group({
      label: [option?.label || '', Validators.required],
      value: [option?.value || '', Validators.required]
    });
    this.optionsArray.push(optionGroup);
  }

  removeOption(index: number): void {
    this.optionsArray.removeAt(index);
  }

  saveField(): void {
    if (this.fieldConfigForm.valid && this.currentField) {
      const formValue = this.fieldConfigForm.value;
      const newField: FormField = {
        type: formValue.type,
        label: formValue.label,
        placeholder: formValue.placeholder,
        required: formValue.required,
        options: formValue.options
      };
      if (this.editIndex !== null) {
        this.formFields[this.editIndex] = newField;
      } else {
        this.formFields.push(newField);
      }
      this.closeDialog();
      this.editIndex = null;
    }
  }

  editField(index: number): void {
    this.openFieldConfigDialog(this.formFields[index], 'edit', index);
  }

  removeField(index: number): void {
    this.formFields.splice(index, 1);
  }

  cancel(): void {
    if (this.formFields.length > 0) {
      if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
        this.router.navigate(['/admin']);
      }
    } else {
      this.router.navigate(['/admin']);
    }
  }

  saveForm(): void {
    if (this.formFields.length === 0) {
      alert('Please add at least one field to the form.');
      return;
    }
    this.modalService.open(this.saveFormDialog, { size: 'lg' });
  }

  closeSaveDialog(): void {
    this.modalService.dismissAll();
    this.saveFormTemplate.reset();
  }

  confirmSave(): void {
    if (this.saveFormTemplate.valid) {
      const template: FormTemplate = {
        id: this.editableTemplate ? this.editableTemplate.id : Date.now().toString(),
        name: this.saveFormTemplate.value.name,
        description: this.saveFormTemplate.value.description,
        fields: this.formFields,
        createdBy: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).username : 'anonymous',
        createdAt: new Date()
      };

      const templates = JSON.parse(localStorage.getItem('formTemplates') || '[]');
      if (this.editableTemplate) {
        const index = templates.findIndex((t: FormTemplate) => t.id === this.editableTemplate.id);
        templates[index] = template;
      } else {
        templates.push(template);
      }
      localStorage.setItem('formTemplates', JSON.stringify(templates));

      this.closeSaveDialog();
      this.router.navigate(['/admin']);
    }
  }
}
