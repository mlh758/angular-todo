import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthedLayoutComponent } from './authed-layout/authed-layout.component';
import { sessionResolver } from './resolvers/session.resolver';
import { LogoutComponent } from './pages/logout/logout.component';
import { FormComponent } from './pages/tasks/new/form/form.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthedLayoutComponent,
    resolve: {
      data: sessionResolver,
    },
    children: [
      {
        path: 'tasks',
        // Lazy load components to split the bundle
        loadComponent: () =>
          import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
        title: 'Tasks',
      },
      {
        path: 'tasks/new',
        component: FormComponent,
        title: 'New Task',
      },
    ],
  },
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'logout',
    component: LogoutComponent,
    title: 'Bye',
  },
];
