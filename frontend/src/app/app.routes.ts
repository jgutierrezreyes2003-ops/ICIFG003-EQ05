import { Routes } from '@angular/router';
export const routes: Routes = [
{
path: 'usuarios',
loadChildren: () =>
import('./features/usuarios/usuario.routes')
.then(m => m.USUARIO_ROUTES)
},
{
path: '',
redirectTo: 'usuarios',
pathMatch: 'full'
}
];