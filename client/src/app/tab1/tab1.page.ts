import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioService } from '../audiobar/audio.service';
import { Track } from '../audiobar/track.model';
import { ArchiveService, Show } from '../services/archive.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  currentTrack$: Observable<Track>;
  shows: Show[] = [];

  constructor(private audioService: AudioService, private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.currentTrack$ = this.audioService.getCurrentTrack();
    // this.getShows();
  }
  playStream() {
    this.audioService.setCurrentTrack(
      {
        song: 'Livestream',
        artist: 'KRBX',
        audioUrl: 'http://radioboise-ice.streamguys1.com/live',
        type: 'livestream'
      } as Track
    )
  }

  async getShows() {
    this.shows = await this.archiveService.getShows();
  }

}
