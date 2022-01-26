import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AudioService } from './audio.service';
import { Track } from './track.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistSubject: BehaviorSubject<Track[]> = new BehaviorSubject([]);
  private playlist = [];
  private currentTrack: Track;
  private playerStatus;

  constructor(private audioService: AudioService) {
    this.subscribeToCurrentTrack();
    this.subscribeToPlayerStatus();
  }

  public subscribeToCurrentTrack() {
    this.audioService.getCurrentTrack()
      .subscribe(track => this.currentTrack = track);
  }

  private subscribeToPlayerStatus() {
    this.audioService.getPlayerStatus()
      .subscribe(status => {
        if (status === 'ended') {
          // if (this.playlist.indexOf(this.currentTrack) + 1 === this.playlist.length) {
          //   this.audioService.setCurrentTrack({} as Track);
          //   this.setPlaylist([]);
          // }
        }
      });
  }

  public getPlaylist(): Observable<Track[]> {
    return this.playlistSubject.asObservable();
  }

  public setPlaylist(playlist: Track[]): void {
    this.playlist = playlist;
    this.playlistSubject.next(playlist);
  }

  public remove(track: Track): void {
    const index = this.playlist.indexOf(track);

    if (index > -1) {
      this.playlist.splice(index, 1);
    }
  }

  public nextTrack(): void {
    const currentTrackIndex = this.playlist.indexOf(this.currentTrack);

    if (currentTrackIndex + 1 !== this.playlist.length) {
      // We are still in bounds of the playlist
      this.audioService.setCurrentTrack(this.playlist[currentTrackIndex + 1]);
    } else {
      // nextTrack was called on the last track so start the playlist over
      this.audioService.setCurrentTrack(this.playlist[0]);
      // this.audioService.pauseAudio();
    }

  }

  public previousTrack(): void {
    const currentTrackIndex = this.playlist.indexOf(this.currentTrack);

    if (currentTrackIndex === 0) {
      this.audioService.setCurrentTrack(this.playlist[0]);
    } else {
      this.audioService.setCurrentTrack(this.playlist[currentTrackIndex - 1]);
    }
  }
}
