import { NgModule }					from '@angular/core';
import { RouterModule, Routes }		from '@angular/router';

// Component
import { AccueilComponent }			from './accueil.component';
import { ProjetComponent }			from './projet.component';
import { ProjetDetailComponent } 	from './projet-detail.component';
import { ContactComponent }         from './contact.component';

const routes: Routes = [
	{ path: '', redirectTo: '/accueil', pathMatch: 'full' },
	{ path: 'accueil', component: AccueilComponent },
	{ path: 'projet', component: ProjetComponent },
	{ path: 'detail/:id', component: ProjetDetailComponent},
	{ path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]	
})
export class AppRoutingModule {}