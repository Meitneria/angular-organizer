import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Injector} from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import {createCustomElement} from '@angular/elements';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TasksComponent } from './tasks/tasks.component';
import { FinanceComponent } from './finance/finance.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { WorkTrackerComponent } from './work-tracker/work-tracker.component';
import { NotesComponent } from './notes/notes.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


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
    NotesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
