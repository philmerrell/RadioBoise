import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArchivesPage } from './archives.page';

import { ArchivesPageRoutingModule } from './archives-routing.module';
import { SvgBarsComponentModule } from '../components/svg-bars/svg-bars.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SvgBarsComponentModule,
    ArchivesPageRoutingModule
  ],
  providers: [ DatePipe ],
  declarations: [ ArchivesPage ]
})
export class ArchivesPageModule {}
