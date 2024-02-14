import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { selectStore } from '@app/state/selectors/posts.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  weddingPath!: Observable<string>;

  constructor(private _storage: Storage, private store: Store) {
    this.store.select(selectStore).pipe(map((data) => console.log(data)));
  }

  async uploadImage(file: File) {
    //obtener la referencia donde guardar la imagen
    const refStorage = ref(this._storage, `celi-tomi/${file.name}`);

    try {
      //subir la imagen
      await uploadBytes(refStorage, file);

      // Obtener la url y retornarla
      const urlImage = await this.getImage(file.name);
      return urlImage;
    } catch (error) {
      return error;
    }
  }

  async getImage(fileName: string): Promise<string> {
    //obtener la referencia doende esta la imagen
    const refStorage = ref(this._storage, `celi-tomi/${fileName}`);
    // retonar la url
    return (await getDownloadURL(refStorage)) as string;
  }
}
