import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthedLayoutComponent } from './authed-layout/authed-layout.component';
import { sessionResolver } from './resolvers/session.resolver';
import { LogoutComponent } from './logout/logout.component';

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
        // Lazy load this component so split the bundle
        loadComponent: () =>
          import('./tasks/tasks.component').then((m) => m.TasksComponent),
        title: 'Tasks',
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
