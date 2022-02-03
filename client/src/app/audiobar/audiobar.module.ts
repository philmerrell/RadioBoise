import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AudiobarComponent } from './audiobar/audiobar.component';
import { FormsModule } from '@angular/forms';
import { IonRangeDirectiveModule } from '../directives/ion-range/ion-range.module';
import { TimePipesModule } from '../directives/time-pipes/time-pipes.module';



@NgModule({
  declarations: [ AudiobarComponent ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimePipesModule,
    IonRangeDirectiveModule
  ],
  exports: [
    AudiobarComponent,
  ],
  providers: []
})
export class AudiobarModule { }
