import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthedLayoutComponent } from './authed-layout/authed-layout.component';
import { sessionResolver } from './resolvers/session.resolver';
import { LogoutComponent } from './pages/logout/logout.component';
import { FormComponent } from './pages/tasks/new/form/form.component';
import { ShowComponent as ShowTaskComponent } from './pages/tasks/show/show.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';

/**
 * Define the routes for the application. You can enable `withComponentInputBinding`
 * in the app config which will bind parameters to the component inputs automatically.
 * I like this more than injecting ActivatedRoute and using the params observable.
 *
 * The catch is that it does not work for components rendered by the component the route
 * renders. For example if ShowTaskComponent renders a child component, that child component
 * will not have the id path segment automatically bound to it. You would have to either
 * pass it explicitly or inject the ActivatedRoute.
 */
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
      {
        path: 'tasks/:id',
        component: ShowTaskComponent,
        title: 'Task',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
      },
      {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin',
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
