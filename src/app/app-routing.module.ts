import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { MainComponent } from './components/main/main.component'
import { combineLatest } from 'rxjs';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'listar', component: ListarProductosComponent },
  { path: 'crear-laptop', component: CrearProductoComponent },
  { path: 'editar-laptop/:id', component: CrearProductoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
