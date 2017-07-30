import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AlunoComponent } from './aluno.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { HomeComponent } from './home/home.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaPipe } from './disciplina.pipe';
import { AlunoService } from './aluno.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './auth-guard';
import { AuthenticationService } from './authentication.service';
import { Interceptor } from './interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlunoInfoComponent } from './aluno-info/aluno-info.component';
import { TurmaService } from './turma.service';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    MatriculaComponent,
    DisciplinaComponent,
    DisciplinaPipe,
    AlunoInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'aluno',
        component: AlunoComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            children: [
              {
                path: 'matricula', component: MatriculaComponent
              },
              {
                path: 'aluno-info', component: AlunoInfoComponent
              }
            ]
          }
        ]
      }
    ], { useHash: true })
  ],
  providers: [
    DisciplinaService,
    AlunoService,
    AuthGuard,
    AuthenticationService,
    TurmaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
