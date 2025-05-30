import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    component: TemplateListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: TemplateListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'preview',
    component: PreviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
