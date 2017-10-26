import { BrowserModule }                       from '@angular/platform-browser';
import { NgModule }                            from '@angular/core';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';


// Component
import { AppComponent }                from './app.component';
import { AccueilComponent }            from './accueil.component';
import { ProjetComponent }             from './projet.component';
import { ProjetDetailComponent }       from './projet-detail.component';
import { ContactComponent }            from './contact.component';
import { BgComponent }                 from './bg.component';
import { FormComponent }               from './form.component';
import { NavComponent }                from './nav.component';
import { NavPrimaryComponent }         from './nav-primary.component';
import { LogoComponent }               from './logo.component';
import { ComposeMessageComponent }          from './compose-message.component';


// Service
import { ProjetService }               from './service/projet.service';
import { FondService }                 from './service/fond.service';

// Module
import { AppRoutingModule }            from './app-routing.modules';
import { HttpClientModule }            from '@angular/common/http';
import { HttpModule }                  from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],  
  declarations: [
    AppComponent,
    AccueilComponent,
    ProjetComponent,
    ProjetDetailComponent,
    ContactComponent,
    BgComponent,
    FormComponent,
    NavComponent,
    NavPrimaryComponent,
    LogoComponent,
    ComposeMessageComponent
  ],
  providers: [ProjetService, FondService],
  bootstrap: [AppComponent],

})
export class AppModule { }
