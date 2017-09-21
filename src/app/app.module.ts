import { BrowserModule }               from '@angular/platform-browser';
import { NgModule }                    from '@angular/core';
import { FormsModule }                 from '@angular/forms';
import { BrowserAnimationsModule }     from '@angular/platform-browser/animations';

// Component
import { AppComponent }                from './app.component';
import { AccueilComponent }            from './accueil.component';
import { ProjetComponent }             from './projet.component';
import { ProjetDetailComponent }       from './projet-detail.component';
import { ContactComponent }            from './contact.component';
import { BgComponent }                 from './bg.component';

// Service
import { ProjetService }               from './projet.service';

// Module
import { AppRoutingModule }            from './app-routing.modules';
import { HttpModule }    from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
  ],  
  declarations: [
    AppComponent,
    AccueilComponent,
    ProjetComponent,
    ProjetDetailComponent,
    ContactComponent,
    BgComponent,
  ],
  providers: [ProjetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
