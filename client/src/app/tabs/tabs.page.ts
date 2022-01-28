import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioService } from '../audiobar/audio.service';
import { PlaylistService } from '../audiobar/playlist.service';
import { Track } from '../audiobar/track.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  currentTrack$: Observable<Track>;

  constructor(
    private audioService: AudioService,
    ) {}

  ngOnInit() {
    this.currentTrack$ = this.audioService.getCurrentTrack();
  }

}
