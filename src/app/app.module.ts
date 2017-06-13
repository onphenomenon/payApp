import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditCardInfoComponent } from './edit-card-info/edit-card-info.component';
import { CardEditService } from './card-edit.service';


@NgModule({
  declarations: [
    AppComponent,
    EditCardInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
	  BrowserAnimationsModule,
    MaterialModule,
    HttpModule
  ],
  providers: [CardEditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
