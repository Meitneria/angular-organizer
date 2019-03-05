import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { FinanceComponent } from './components/finance/finance.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { WorkTrackerComponent } from './components/work-tracker/work-tracker.component';
import { NotesComponent } from './components/notes/notes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeItemComponent } from './home/home-item/home-item.component';
import { RouterModule, Routes } from '@angular/router';
import { ProgressBarComponent } from './components/tasks/progress-bar/progress-bar.component';
import { DateComponent } from './date/date.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { TaskItemComponent } from './components/tasks/task-item/task-item.component';
import { TaskInputComponent } from './components/tasks/task-input/task-input.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './resource/user/user.reducer';

import {
  MatButtonModule,
  MatBadgeModule,
  MatIconModule
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { GroupAvatarComponent } from './components/tasks/group-avatar/group-avatar.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'work-tracker', component: WorkTrackerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    TasksComponent,
    FinanceComponent,
    ShoppingListComponent,
    WorkTrackerComponent,
    NotesComponent,
    HomeItemComponent,
    ProgressBarComponent,
    DateComponent,
    TaskItemComponent,
    TaskInputComponent,
    LoginComponent,
    GroupAvatarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgProgressModule,
    RouterModule.forRoot(appRoutes),
    NgProgressRouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    StoreModule.forRoot({ user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule {}
