import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


export interface ArchivedShowListItem {
  title: string;
  id: number;
}

export interface ArchivesResponse {
  data: any[];
  links: any;
  meta: any;
}

export interface ShowArchiveItem {
  audio: ShowArchiveAudioItem;
  audio_id: number;
  created_at: any;
  end: string;
  id: number;
  image: string;
  publish_at: string;
  show: ShowArchiveInfoItem;
  start: string;
  studio_id: number;
  text: string;
  text_markdown: string;
  title: string;
  updated_at: string;
}

export interface ShowArchiveAudioItem {
  codec: string;
  file_path: string;
  filesize: number;
  id: number;
  meta: any;
  subtype: string;
  title: string;
  type: string;
  url: string;
}

export interface ShowArchiveInfoItem {
  archives_disable_seek: any;
  created_at: string;
  description: string;
  id: number;
  image: any;
  is_retired: boolean;
  name: string;
  summary: string;
  title: string;
  updated_at: string;
  users: any[];
}

export interface Show {
  id: number;
  title: string;
  name: string;
  summary: string;
  description: string;
  is_retired: boolean;
  created_at: string;
  archives_disable_seek: any;
  updated_at: string;
  users: any[];
  image: any;
}

export interface ShowTrack {
  id: number;
  start: string;
  end: string;
  song: any;
  user_id: number;
  broadcast_id: number;
  show_id: number;
  imported_id: number;
  imported_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  async getShows() {
    return this.http.get(`${environment.apiUrl}/creek/shows`)
      .pipe(
        map((response: { data: Show[]}, meta: any) => response.data)
      ).toPromise();
  }

  async getArchiveShowsList() {
    return this.http.get(`${environment.apiUrl}/creek/archives/shows-list`)
      .pipe(
        map((response: { data: ArchivedShowListItem[]}, meta: any) => response.data)
      ).toPromise();
  }

  async getArchives(showId?: number): Promise<ShowArchiveItem[]> {
    let url = `${environment.apiUrl}/creek/archives`;
    if (showId) {
      url = `${url}?showId=${showId}`
    }
    return this.http.get<ArchivesResponse>(url)
      .pipe(
        map((response: ArchivesResponse) => response.data)
      ).toPromise();
  }

  async getTracks(): Promise<ShowTrack[]> {
    let url = `${environment.apiUrl}/creek/tracks`;
    return this.http.get(url)
      .pipe(
        map((response: ArchivesResponse) => response.data)
      ).toPromise();
  }
}
