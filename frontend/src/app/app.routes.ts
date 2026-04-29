import { Routes } from '@angular/router';
export const routes: Routes = [
{
path: 'personas',
loadChildren: () =>
import('./features/personas/persona.routes')
.then(m => m.PERSONA_ROUTES)
},
{
path: '',
redirectTo: 'personas',
pathMatch: 'full'
}
];