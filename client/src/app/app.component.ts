import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AudioService } from './audiobar/audio.service';
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
  isSeeking: boolean;
  percentElapsed: number;
  audioElement: HTMLAudioElement;
  seekingTimeElapsed: number;


  constructor(private archiveService: ArchiveService, private audioService: AudioService) {}

  async ngOnInit() {
    this.audioElement = this.audioService.getAudioElement();
    this.currentTrack;
    this.getPlayerStatus();
    this.getCurrentTrack();
    this.initLivestream();
    this.getPercentElapsed();
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

  pauseSeeking(ev: any): void {
    this.stopProp(ev);
    this.isSeeking = true;
  }

  stopProp(e: any): void {
    e.stopPropagation();
  }

  async seekToTime(ev: any): Promise<void> {
    this.stopProp(ev);
    const position = ev.target.value / (100 / this.audioService.getAudioElement().duration);
    this.audioService.seekAudio(position);
    this.isSeeking = false;
  }

  calculateSeekTime(event) {
    if (this.isSeeking) {
      const rangeValue = event.detail.value;
      this.getSeekingTimeElapsed(rangeValue);
      this.getSeekingTimeRemaining(rangeValue);
    }
  }

  seekForward() {
    const newTime = this.audioElement.currentTime + 30
    this.audioService.seekAudio(newTime);
  }

  seekBackward() {
    const newTime = this.audioElement.currentTime - 30
    this.audioService.seekAudio(newTime);
  }

  private getSeekingTimeElapsed(rangeValue) {
    this.seekingTimeElapsed = this.audioService.getSeekingTimeElapsed(rangeValue);
  }

  private getSeekingTimeRemaining(rangeValue) {

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

  private getPercentElapsed() {
    this.audioService.getPercentElapsed()
      .subscribe(percent => {
        if (!this.isSeeking) {
          this.percentElapsed = percent;
        }
      });
  }


}
