import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyModule } from './body/body.module';
import { AdminModule } from './admin/admin.module';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    BodyModule,
    AdminModule,
    NgxStripeModule.forRoot('pk_test_51LzfPJAgo6s7HMar16kGjC9VcBkPFnL1caFOr10C93i0pTbBf1zyAp2tYY688PWBXPY3PAfEeIhRKeMwJr99MXJY00mLFk64Ul')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
