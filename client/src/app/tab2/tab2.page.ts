import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../audiobar/playlist.service';
import { Track } from '../audiobar/track.model';
import { ArchivedShowListItem, ArchiveService, ShowArchiveItem } from '../services/archive.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  archivedShowsList: ArchivedShowListItem[] = [];
  archives: ShowArchiveItem[] = [];
  
  constructor(private archiveService: ArchiveService, private playlistService: PlaylistService) {}

  ngOnInit() {
    this.getArchivedShowsList();
    this.getArchives();
  }

  async getArchivedShowsList() {
    this.archivedShowsList = await this.archiveService.getArchiveShowsList();
  }

  async getArchives() {
    this.archives = await this.archiveService.getArchives();
  }

  playArchive(archive: ShowArchiveItem) {
    console.log(archive);
    this.playlistService.setPlaylist([
      {
        song: archive.start,
        artist: archive.show.title + ' (archive)',
        audioUrl: archive.audio.url,
        type: 'file'
      } as Track
    ])
  }

}
