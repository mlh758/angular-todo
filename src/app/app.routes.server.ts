import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * You can configure _how_ to render each route in your application
 * using this file. In this case we fall back to server rendering
 * unless told otherwise.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'auth/tasks',
    renderMode: RenderMode.Client,
  },
  {
    path: 'auth/tasks/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
