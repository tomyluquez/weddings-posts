import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Post } from '@app/core/models/post.model';
import { pathWedding } from '@app/state/selectors/posts.selectors';
import { Store, select } from '@ngrx/store';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  PATH_COLLECTION = 'weddings';
  _collection = collection(this._firestore, this.PATH_COLLECTION);
  weddingPath$!: Observable<string>;
  weddingPath: string = '';

  constructor(private _firestore: Firestore, private _store: Store) {
    this.weddingPath$ = this._store.pipe(select(pathWedding));
    this.weddingPath$.subscribe((path: string) => (this.weddingPath = path));
  }

  getWedding(weddingPath: string) {
    // buscamos la boda en la coleccion "weddings" segun el weddingPath de la url
    return collectionData(this._collection).pipe(
      switchMap((weddings) => {
        const weddingActive = weddings.find(
          (wedding) => wedding['path'] === weddingPath
        );
        if (!weddingActive) return of(null);

        return of(weddingActive);
      })
    );
  }

  async uploadPost(post: Post) {
    try {
      // obtenemos la referencia de la boda
      const celiDocRef = doc(
        this._firestore,
        `${this.PATH_COLLECTION}/${this.weddingPath}`
      );
      // obtenemos el documento dentro de la referencia
      const docSnap = await getDoc(celiDocRef);
      if (docSnap.exists()) {
        // en caso de que exista obtenemos la data que contiene el documento y agregamos un post a posts[]
        const data = docSnap.data();
        const posts = data['posts'];
        posts.unshift(post);
        return await updateDoc(celiDocRef, {
          posts,
        });
      }
    } catch (error) {
      console.error('Error al agregar el nuevo post:', error);
    }
  }

  async updatePost(
    id: string | undefined,
    image: string | unknown,
    comment: string
  ) {
    try {
      // obtenemos la referencia de la boda
      const celiDocRef = doc(
        this._firestore,
        `${this.PATH_COLLECTION}/${this.weddingPath}`
      );
      // obtenemos el documento dentro de la referencia
      const docSnap = await getDoc(celiDocRef);
      if (docSnap.exists()) {
        // en caso de que exista obtenemos la data que contiene el documento y editamos el post en posts[]
        const data = docSnap.data();
        const posts = data['posts'];
        const postIndex = posts.findIndex(
          (post: Post) => post.publicationId === id
        );
        if (postIndex !== -1) {
          posts[postIndex].image = image;
          posts[postIndex].comment = comment;
        }
        return await updateDoc(celiDocRef, {
          posts: posts,
        });
      }
    } catch (error) {
      console.error('Error al agregar el nuevo post:', error);
    }
  }

  async likePost(id: string, userName: string) {
    try {
      // obtenemos la referencia de la boda
      const celiDocRef = doc(
        this._firestore,
        `${this.PATH_COLLECTION}/${this.weddingPath}`
      );
      // obtenemos el documento dentro de la referencia
      const docSnap = await getDoc(celiDocRef);
      if (docSnap.exists()) {
        // en caso de que exista obtenemos la data que contiene el documento y editamos el post en posts[]
        const data = docSnap.data();
        const posts = data['posts'];
        const postIndex = posts.findIndex(
          (post: Post) => post.publicationId === id
        );
        if (postIndex !== -1) {
          posts[postIndex].likes.push(userName);
        }
        return await updateDoc(celiDocRef, {
          posts: posts,
        });
      }
    } catch (error) {
      console.error('Error al agregar el nuevo post:', error);
    }
  }

  async noLikePost(id: string, userName: string) {
    try {
      // obtenemos la referencia de la boda
      const celiDocRef = doc(
        this._firestore,
        `${this.PATH_COLLECTION}/${this.weddingPath}`
      );
      // obtenemos el documento dentro de la referencia
      const docSnap = await getDoc(celiDocRef);
      if (docSnap.exists()) {
        // en caso de que exista obtenemos la data que contiene el documento y editamos el post en posts[]
        const data = docSnap.data();
        const posts = data['posts'];
        const postIndex = posts.findIndex(
          (post: Post) => post.publicationId === id
        );
        if (postIndex !== -1) {
          posts[postIndex].likes.splice(
            posts[postIndex].likes.indexOf(userName),
            1
          );
        }
        return await updateDoc(celiDocRef, {
          posts: posts,
        });
      }
    } catch (error) {
      console.error('Error al agregar el nuevo post:', error);
    }
  }

  async deletePost(id: string) {
    try {
      // obtenemos la referencia de la boda
      const celiDocRef = doc(
        this._firestore,
        `${this.PATH_COLLECTION}/${this.weddingPath}`
      );
      // obtenemos el documento dentro de la referencia
      const docSnap = await getDoc(celiDocRef);
      if (docSnap.exists()) {
        // en caso de que exista obtenemos la data que contiene el documento y editamos el post en posts[]
        const data = docSnap.data();
        const posts = data['posts'];
        const postIndex = posts.findIndex(
          (post: Post) => post.publicationId === id
        );
        if (postIndex !== -1) {
          posts.splice(postIndex, 1);
        }
        return await updateDoc(celiDocRef, {
          posts: posts,
        });
      }
    } catch (error) {}
  }
}
