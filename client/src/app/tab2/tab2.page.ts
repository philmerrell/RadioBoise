import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
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
  archiveHeader = 'Latest';
  
  constructor(
    public routerOutlet: IonRouterOutlet,
    private archiveService: ArchiveService,
    private playlistService: PlaylistService,
    private modalController: ModalController) {}

  ngOnInit() {
    this.getArchivedShowsList();
    this.getArchives();
  }

  async getArchivedShowsList(show?: ShowArchiveItem) {
    this.archivedShowsList = await this.archiveService.getArchiveShowsList();
  }

  async getArchives(archive?: ShowArchiveItem) {
    if (archive) {
      this.archives = await this.archiveService.getArchives('the-daft-manifesto');
    } else {
      this.archives = await this.archiveService.getArchives();
    }
  }

  selectShow(archive: ShowArchiveItem) {
    console.log(archive);
    this.getArchives(archive);
    this.archiveHeader = archive.title;
    this.modalController.dismiss();
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

  dismiss() {
    this.modalController.dismiss();
  }

}
