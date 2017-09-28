import { NgModule }					from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

// Component
import { AccueilComponent }			from './accueil.component';
import { ProjetComponent }			from './projet.component';
import { ProjetDetailComponent } 	from './projet-detail.component';
import { ContactComponent }         from './contact.component';


const routes: Routes = [
	{ path: '', redirectTo: '/accueil', pathMatch: 'full' },
	{ path: 'accueil', component: AccueilComponent, data: { animation: 'home' } },
	{ path: 'projet', component: ProjetComponent, data: { animation: 'projet' } },
	{ path: 'projet/:id', component: ProjetDetailComponent,  data: { animation: 'details' } },
	{ path: 'contact', component: ContactComponent, data: { animation: 'contact' }},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]	
})
export class AppRoutingModule {}