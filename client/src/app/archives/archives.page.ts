import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AudioService } from '../audiobar/audio.service';
import { Track } from '../audiobar/track.model';
import { ArchivedShowListItem, ArchiveService, ShowArchiveItem } from '../services/archive.service';

@Component({
  selector: 'app-archives',
  templateUrl: 'archives.page.html',
  styleUrls: ['archives.page.scss']
})
export class ArchivesPage implements OnInit {
  archivedShowsList: ArchivedShowListItem[] = [];
  archives: ShowArchiveItem[] = [];
  archivesRequestComplete: boolean;
  currentArchivePlaying: ShowArchiveItem;
  filterChipText: string;
  currentTrack: Track;
  playerStatus = '';

  
  constructor(
    public routerOutlet: IonRouterOutlet,
    private audioService: AudioService,
    private datePipe: DatePipe,
    private archiveService: ArchiveService,
    private modalController: ModalController) {}

  ngOnInit() {
    this.getArchivedShowsList();
    this.getArchives();
    this.getCurrentTrack();
    this.getPlayerStatus();
  }

  getPlayerStatus() {
    this.audioService.getPlayerStatus().subscribe(status => this.playerStatus = status);
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
      song: this.datePipe.transform(archive.start, 'EEEE, MMMM d') + ' (archive)',
      artist: archive.show.title,
      audioUrl: archive.audio.url,
      type: 'archive'
    } as Track;

    this.currentArchivePlaying = archive;
    this.audioService.setCurrentTrack(track);
    this.audioService.play();
  }

  clearFilter() {
    this.filterChipText = null;
    this.getArchives();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getCurrentTrack() {
    this.audioService.getCurrentTrack().subscribe(track => {
      if (track.type === 'livestream') {
        this.currentArchivePlaying = null;
      }
    })
  }

}
