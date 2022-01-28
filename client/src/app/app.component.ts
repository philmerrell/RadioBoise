import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AudioService } from './audiobar/audio.service';
import { PlaylistService } from './audiobar/playlist.service';
import { Track } from './audiobar/track.model';
import { ArchiveService } from './services/archive.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isSplitPaneVisible = true;
  tracks = [];
  currentTrack: Track;
  playerStatus = '';

  constructor(private archiveService: ArchiveService, private audioService: AudioService) {}

  async ngOnInit() {
    this.currentTrack;
    this.getPlayerStatus();
    this.getCurrentTrack();
    this.initLivestream();
    this.tracks = await this.archiveService.getTracks();
  }

  initLivestream() {
    this.audioService.setCurrentTrack(
      {
        song: 'Livestream',
        artist: 'KRBX',
        audioUrl: 'http://radioboise-ice.streamguys1.com/live',
        type: 'livestream'
      } as Track
    )
  }

  toggleAudio() {
    this.audioService.toggleAudio();
  }

  private getCurrentTrack() {
    this.audioService.getCurrentTrack()
      .pipe(delay(0)).subscribe(track => this.currentTrack = track);
  }

  public handleSplitPaneVisible(event: any) {
    this.isSplitPaneVisible = event.detail.visible;
  }

  async getTracks() {
    this.tracks = await this.archiveService.getTracks();
  }

  getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .subscribe(status => {
        this.playerStatus = status
      });
      
  }


}
