import { Component, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AudioService } from '../audio.service';
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
  playerStatus: string = '';
  imageLoaded: boolean;
  isSeeking: boolean;
  percentElapsed: number;
  modalHeight: number;
  seekingTimeElapsed: number;
  
  constructor(
    private modalController: ModalController,
    public routerOutlet: IonRouterOutlet,
    private audioService: AudioService,
    private zone: NgZone) { }

  ngOnInit() {
    this.audioElement = this.audioService.getAudioElement();
    this.getCurrentTrack();
    this.getPlayerStatus();
    this.getPercentElapsed();
    this.getCurrentTrack();
  }

  ngOnChanges(changes: SimpleChanges) {}

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

  seekForward() {
    const newTime = this.audioElement.currentTime + 30
    this.audioService.seekAudio(newTime);
  }

  seekBackward() {
    const newTime = this.audioElement.currentTime - 30
    this.audioService.seekAudio(newTime);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  stop() {
    // this.audioService.stop();
    this.audioService.setCurrentTrack({} as Track);
  }

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

  toggleAudio(event: MouseEvent) {
    console.log(event);
    event.stopPropagation();
    this.audioService.toggleAudio();
  }

  private getCurrentTrack() {
    this.audioService.getCurrentTrack()
      .subscribe(track => this.track = track);
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

  setIsSeeking() {
    this.isSeeking = true;
  }

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

}
