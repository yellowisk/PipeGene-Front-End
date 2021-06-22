import { AuthService } from 'src/app/services/auth.service';
import { InputValidationModule } from './components/input-validation/input-validation.module';
import { HttpRequestInterceptor } from './interceptors/httpRequest.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainModule } from './views/main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './views/auth/login/login.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    InputValidationModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    CookieModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
