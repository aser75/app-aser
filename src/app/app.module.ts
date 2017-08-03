import { BrowserModule }               from '@angular/platform-browser';
import { NgModule }                    from '@angular/core';
import { FormsModule }                 from '@angular/forms';

// Component
import { AppComponent }                from './app.component';
import { AccueilComponent }            from './accueil.component';
import { ProjetComponent }             from './projet.component';
import { ProjetDetailComponent }       from './projet-detail.component';
import { ContactComponent }            from './contact.component';

// Service
import { ProjetService }               from './projet.service';

// Module
import { AppRoutingModule }            from './app-routing.modules';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],  
  declarations: [
    AppComponent,
    AccueilComponent,
    ProjetComponent,
    ProjetDetailComponent,
    ContactComponent,
  ],
  providers: [ProjetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
