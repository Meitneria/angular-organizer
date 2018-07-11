import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksComponent } from './tasks/tasks.component';
import { FinanceComponent } from './finance/finance.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { WorkTrackerComponent } from './work-tracker/work-tracker.component';
import { NotesComponent } from './notes/notes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeItemComponent } from './home-item/home-item.component';
import { RouterModule, Routes } from '@angular/router';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DateComponent } from './date/date.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { RouterResolver } from './router.resolver';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from '../environments/environment';


const appRoutes: Routes = [
  { path: 'calendar', component: CalendarComponent, resolve: { crisis: RouterResolver } },
  { path: 'finance', component: FinanceComponent, resolve: { crisis: RouterResolver } },
  { path: '', component: HomeComponent, resolve: { crisis: RouterResolver } },
  { path: 'notes', component: NotesComponent, resolve: { crisis: RouterResolver } },
  { path: 'shopping-list', component: ShoppingListComponent, resolve: { crisis: RouterResolver } },
  { path: 'tasks', component: TasksComponent, resolve: { crisis: RouterResolver } },
  { path: 'work-tracker', component: WorkTrackerComponent, resolve: { crisis: RouterResolver }}
  ];

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HomeComponent,
    CalendarComponent,
    TasksComponent,
    FinanceComponent,
    ShoppingListComponent,
    WorkTrackerComponent,
    NotesComponent,
    HomeItemComponent,
    ProgressBarComponent,
    DateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgProgressModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgProgressRouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [RouterResolver],
  bootstrap: [AppComponent]
})
export class AppModule {

}
