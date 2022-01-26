import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AudiobarComponent } from './audiobar/audiobar.component';
import { FormsModule } from '@angular/forms';
import { TimeRemainingPipe } from './time-remaining.pipe';
import { TimeElapsedPipe } from './time-elapsed.pipe';



@NgModule({
  declarations: [ AudiobarComponent, TimeRemainingPipe, TimeElapsedPipe ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    AudiobarComponent,
  ],
  providers: []
})
export class AudiobarModule { }
