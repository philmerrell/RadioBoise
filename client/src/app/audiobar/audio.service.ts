import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from './track.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audio: HTMLAudioElement = new Audio();
  
  private currentTrack: BehaviorSubject<Track> = new BehaviorSubject({} as Track);
  private percentElapsed: BehaviorSubject<number> = new BehaviorSubject(0);
  private percentLoaded: BehaviorSubject<number> = new BehaviorSubject(0);
  private playerStatus: BehaviorSubject<string> = new BehaviorSubject('paused');

  
  constructor() {
    this.attachListeners();
  }

  private attachListeners(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('progress', this.calculatePercentLoaded, false);
    this.audio.addEventListener('waiting', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  getCurrentTrack(): Observable<Track> {
    return this.currentTrack.asObservable();
  }

  getPlayerStatus(): Observable<string> {
    return this.playerStatus.asObservable();
  }

  setCurrentTrack(track: Track): void {
    if (track) {
      this.setAudio(track);
      this.currentTrack.next(track);
    }
  }

  getPercentLoaded(): Observable<number> {
    return this.percentLoaded.asObservable();
  }

  getPercentElapsed(): Observable<number> {
    return this.percentElapsed.asObservable();
  }

  seekAudio(position: number): void {
    this.audio.currentTime = position;
  }

  getSeekingTimeElapsed(value): number {
    const duration = this.getAudioElement().duration;
    return value * duration / 100;
  }

  getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  async setAudio(audio: Track) {
    if (audio.audioUrl) {
      this.audio.src = audio.audioUrl;
    };
  }

  pause() {
    this.audio.pause();
  }

  async play() {
    console.log(this.audio)
    await this.audio.play();
  }

  

  private calculateTime = (evt) => {
    const ct = this.audio.currentTime;
    const d = this.audio.duration;
    this.setPercentElapsed(d, ct);
  }

  private calculatePercentLoaded = (evt) => {
    try {
      const b = this.audio.buffered.end(0);
      const d = this.audio.duration;
      const percent = ((b / d) * 100);
      this.setPercentLoaded(percent);
    } catch (err) {
      this.setPercentLoaded(0);
    }
  }

  private setPlayerStatus = (evt) => {
    switch (evt.type) {
      case 'playing':
        this.playerStatus.next('playing');
        break;
      case 'pause':
        this.playerStatus.next('paused');
        break;
      case 'waiting':
        this.playerStatus.next('loading');
        break;
      case 'ended':
        this.playerStatus.next('ended');
        break;
      default:
        this.playerStatus.next('paused');
        break;
    }
  }

  private setPercentElapsed(d: number, ct: number): void {
    this.percentElapsed.next((Math.floor((ct / d) * 100)) || 0);
  }

  private setPercentLoaded(p): void {
    this.percentLoaded.next(parseInt(p, 10) || 0);
  }

  async toggleAudio(): Promise<void> {
    (this.audio.paused) ? await this.audio.play() : this.audio.pause();
  }
}
