import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { LOGIN_ROUTES } from './login.routes';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(LOGIN_ROUTES)
  ],
  exports: [ LoginComponent ],
  providers: [ LoginService ]
})
export class LoginModule {}
