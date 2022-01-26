import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistService } from '../audiobar/playlist.service';
import { Track } from '../audiobar/track.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  playlist$: Observable<Track[]>;

  constructor(
    private playlistService: PlaylistService,
    ) {}

  ngOnInit() {
    this.playlist$ = this.playlistService.getPlaylist();
  }

}
