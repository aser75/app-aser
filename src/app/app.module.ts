import { BrowserModule }               from '@angular/platform-browser';
import { NgModule }                    from '@angular/core';
import { FormsModule, ReactiveFormsModule  }                 from '@angular/forms';
import { BrowserAnimationsModule }     from '@angular/platform-browser/animations';


// Component
import { AppComponent }                from './app.component';
import { AccueilComponent }            from './accueil.component';
import { ProjetComponent }             from './projet.component';
import { ProjetDetailComponent }       from './projet-detail.component';
import { ContactComponent }            from './contact.component';
import { BgComponent }                 from './bg.component';
import { FormComponent }               from './form.component';

// Service
import { ProjetService }               from './projet.service';

// Module
import { AppRoutingModule }            from './app-routing.modules';
import { HttpClientModule }            from '@angular/common/http';
import { HttpModule }                  from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpModule,
  ],  
  declarations: [
    AppComponent,
    AccueilComponent,
    ProjetComponent,
    ProjetDetailComponent,
    ContactComponent,
    BgComponent,
    FormComponent,
  ],
  providers: [ProjetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
