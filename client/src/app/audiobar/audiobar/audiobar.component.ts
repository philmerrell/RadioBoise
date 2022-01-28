import { Component, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AudioService } from '../audio.service';
import { PlaylistService } from '../playlist.service';
import { Track } from '../track.model';

@Component({
  selector: 'app-audiobar',
  templateUrl: './audiobar.component.html',
  styleUrls: ['./audiobar.component.scss'],
})
export class AudiobarComponent implements OnInit {

  @Input() playlist: Track[] = [];
  audioElement: HTMLAudioElement;
  track: Track;
  // percentElapsed$: Observable<number>;
  // percentLoaded$: Observable<number>;
  playerStatus: string = '';
  imageLoaded: boolean;
  isSeeking: boolean;
  percentElapsed: number;
  modalHeight: number;
  seekingTimeElapsed: number;
  
  constructor(
    public routerOutlet: IonRouterOutlet,
    private playlistService: PlaylistService,
    private audioService: AudioService,
    private zone: NgZone) { }

  ngOnInit() {
    this.audioElement = this.audioService.getAudioElement();
    this.getCurrentTrack();
    this.getPlayerStatus();
    this.getPercentElapsed();
  }

  ngOnChanges(changes: SimpleChanges) {
    
  }

  stop() {
    // this.audioService.stop();
    this.audioService.setCurrentTrack({} as Track);
  }

  play() {
    // this.audioService.play();
  }

  // getPercentElapsed() {
  //   this.percentElapsed$ = this.audioService.getPercentElapsed();
  // }

  // getPercentLoaded() {
  //   this.percentLoaded$ = this.audioService.getPercentLoaded();
  // }

  getPlayerStatus() {
    this.audioService.getPlayerStatus()
      .subscribe(status => {
        this.zone.run(() => {
          console.log('playerStatus:', status);
          this.playerStatus = status
        });
      });
  }

  getTimeRemaining() {}

  toggleAudio(event: PointerEvent) {
    console.log(event);
    event.stopPropagation();
    this.audioService.toggleAudio();
  }

  private getCurrentTrack() {
    this.audioService.getCurrentTrack()
      .subscribe(track => this.track = track);
  }

  private setCurrentTrack(track: Track) {
    if (track) {
      this.audioService.setCurrentTrack(track);
    }
  }

  calculateSeekTime(event) {
    if (this.isSeeking) {
      const rangeValue = event.detail.value;
      this.getSeekingTimeElapsed(rangeValue);
      this.getSeekingTimeRemaining(rangeValue);
    }
  }

  private getSeekingTimeElapsed(rangeValue) {
    this.seekingTimeElapsed = this.audioService.getSeekingTimeElapsed(rangeValue);
  }

  private getSeekingTimeRemaining(rangeValue) {

  }

  closeDetail() {
    // this.close.emit(true);
  }

  getModalHeight() {
    const modal = document.querySelector('ion-modal');
    this.modalHeight = modal.clientHeight;
  }

  seekAudio(value) {
    this.isSeeking = false;
    const position = value / (100 / this.audioService.getAudioElement().duration);
    this.audioService.seekAudio(position);
  }

  setIsSeeking() {
    this.isSeeking = true;
  }

  // toggleAudio() {
  //   this.audioService.toggleAudio();
  // }

  imageLoadedHander(event) {
    this.imageLoaded = true;
  }

  private getPercentElapsed() {
    this.audioService.getPercentElapsed()
      .subscribe(percent => {
        if (!this.isSeeking) {
          this.percentElapsed = percent;
        }
      });
  }

  // private subscribeToPlayerStatus() {
  //   this.audioService.getPlayerStatus()
  //       .subscribe(status => {
  //         this.playerStatus = status;
  //       });
  // }

}
