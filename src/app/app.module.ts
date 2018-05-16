import { BrowserModule }                       from '@angular/platform-browser';
import { NgModule }                            from '@angular/core';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';
import { MatSelectModule }                     from '@angular/material';

// Component
import { AppComponent }                        from './app.component';
import { AccueilComponent }                    from './accueil.component';
import { ProjetComponent }                     from './projet.component';
import { ProjetDetailComponent }               from './projet-detail.component';
import { ContactComponent }                    from './contact.component';
import { BgComponent }                         from './bg.component';
import { FormComponent }                       from './form.component';
import { NavComponent }                        from './nav.component';
import { NavPrimaryComponent }                 from './nav-primary.component';
import { LogoComponent }                       from './logo.component';
import { ComposeMessageComponent }             from './compose-message.component';

//Directive
import { LoaderComponent }                       from './directive/loader.component';

// Service
import { ProjetService }                       from './service/projet.service';
import { CategorieService }                    from './service/categorie.service';
import { FondService }                         from './service/fond.service';

//Pipe
import { TruncatePipe }                          from './pipe/truncate.pipe';
import { CategoryPipe }                          from './pipe/category.pipe';
import { UrlPipe }                               from './pipe/url.pipe';
import { OtherPipe }                             from './pipe/other.pipe';
import { OrderPipe }                             from './pipe/order.pipe';
import { VisiblePipe }                           from './pipe/visible.pipe';

// Module
import { AppRoutingModule }                    from './app-routing.modules';
import { HttpClientModule }                    from '@angular/common/http';
import { HttpModule }                          from '@angular/http';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MatSelectModule
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
    ComposeMessageComponent,
    TruncatePipe,
    CategoryPipe,
    UrlPipe,
    LoaderComponent,
    OtherPipe,
    OrderPipe,
    VisiblePipe
  ],
  providers: [ProjetService, FondService, CategorieService],
  bootstrap: [AppComponent],

})
export class AppModule {}
