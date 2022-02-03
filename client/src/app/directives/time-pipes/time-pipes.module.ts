import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeElapsedPipe } from './time-elapsed.pipe';
import { TimeRemainingPipe } from './time-remaining.pipe';
@NgModule({
  imports: [CommonModule],
  declarations: [TimeElapsedPipe, TimeRemainingPipe],
  exports: [TimeRemainingPipe, TimeElapsedPipe],
})
export class TimePipesModule {}
