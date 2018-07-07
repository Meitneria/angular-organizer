import { BrowserModule } from '@angular/platform-browser';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeItemComponent } from './home-item/home-item.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'home', component: HomeComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'work-tracker', component: WorkTrackerComponent }
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
    HomeItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
