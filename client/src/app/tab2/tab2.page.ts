import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AudioService } from '../audiobar/audio.service';
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
  filterChipText: string;
  archivesRequestComplete: boolean;
  
  constructor(
    private audioService: AudioService,
    public routerOutlet: IonRouterOutlet,
    private archiveService: ArchiveService,
    private modalController: ModalController) {}

  ngOnInit() {
    this.getArchivedShowsList();
    this.getArchives();
  }

  async getArchivedShowsList() {
    this.archivedShowsList = await this.archiveService.getArchiveShowsList();
  }

  async getArchives(archive?: ArchivedShowListItem) {
    this.archivesRequestComplete = false;
    if (archive) {
      this.archives = await this.archiveService.getArchives(archive.id);
    } else {
      this.archives = await this.archiveService.getArchives();
    }
    this.archivesRequestComplete = true;
  }

  selectShow(archive: ArchivedShowListItem) {
    this.getArchives(archive);
    this.filterChipText = archive.title;
    this.modalController.dismiss();
  }

  async playArchive(archive: ShowArchiveItem) {
    const track = {
      song: archive.start + ' (archive)',
      artist: archive.show.title,
      audioUrl: archive.audio.url,
      type: 'file'
    } as Track;

    // this.audioService.pause();
    // this.playlistService.setPlaylist([
    //   track
    // ]);
    this.audioService.setCurrentTrack(track);
    this.audioService.play();
  }

  clearFilter() {
    this.filterChipText = undefined;
    this.getArchives();
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
