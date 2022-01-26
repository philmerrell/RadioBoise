import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioService } from '../audiobar/audio.service';
import { PlaylistService } from '../audiobar/playlist.service';
import { Track } from '../audiobar/track.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  currentTrack$: Observable<Track>;

  constructor(private playlistService: PlaylistService, private audioService: AudioService) {}

  ngOnInit(): void {
    this.currentTrack$ = this.audioService.getCurrentTrack();
  }
  playStream() {
    this.playlistService.setPlaylist([
      {
        song: 'test',
        artist: 'test',
        audioUrl: 'http://radioboise-ice.streamguys1.com/live',
        type: 'livestream'
      } as Track
    ])
  }

}
