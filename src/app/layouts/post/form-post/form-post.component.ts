import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '@app/components/shared/loader/loader.component';
import { Post } from '@app/core/models/post.model';
import { FirebaseService } from '@app/services/firebase.service';
import { StorageService } from '@app/services/storage.service';
import { pathWedding } from '@app/state/selectors/posts.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.css',
})
export class FormPostComponent implements OnChanges {
  @Input() post?: Post | null;
  image?: string;
  imageSelected!: File;
  loading: boolean = false;
  weddingPath$!: Observable<string>;
  currentUrl = this.router.url;

  formPost!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _storage: StorageService,
    private _firestore: FirebaseService,
    private _store: Store,
    private router: Router
  ) {
    // inicializamos el formulario
    this.formPost = this.formBuilder.group({
      image: [this.post?.image || '', Validators.required],
      comment: [this.post?.comment || '', Validators.required],
    });

    this.weddingPath$ = this._store.pipe(select(pathWedding));
  }

  ngOnChanges(): void {
    //si llega algo a traves del input se refleja el cambio y se setea el formulario con los valores del post
    if (this.post?.image && this.post?.comment) {
      this.formPost.patchValue({
        image: this.post?.image,
        comment: this.post?.comment,
      });
    }
  }

  onFileSelected(event: any) {
    // cada vez que se selecciona una imagen del input en el html se genera una url para renderizar la imagen
    this.imageSelected = event.target.files[0];
    if (this.imageSelected) {
      this.image = URL.createObjectURL(this.imageSelected);
    }
  }

  selectImage() {
    // es el metodo de hacer click en el input html ya que esta oculto para darle estilos
    (document.querySelector('input#inputImage') as HTMLInputElement)?.click();
  }

  async onSubmit() {
    this.loading = true;
    // comprobamos segun la url si es un nuevo post o no
    const isNewPost = this.currentUrl.includes('new');
    let urlImage: string | unknown;
    // obtenemos el path de la boda desde la url para pasarlo como argumento
    let weddingPath;
    this.weddingPath$.subscribe((path: string) => (weddingPath = path));

    if (this.formPost.valid) {
      const comment = this.formPost.get('comment')!.value;
      const imageFile = this.imageSelected;

      if (imageFile) {
        // en caso de que se haya seleccionado una imagen desde el input html se sube al storage
        try {
          urlImage = await this._storage.uploadImage(imageFile);
        } catch (error) {
          console.error(error);
        }
      } else {
        // caso contrario se guarda la imagen que ya tiene el post
        urlImage = this.post?.image;
      }

      if (isNewPost) {
        // si es un nuevo post, se genera un nuevo objeto y se llama al metodo de firestore
        const newPost: Post = {
          userName: 'userName',
          publicationId: uuidv4(),
          comment,
          image: urlImage,
          date: new Date(),
          comments: [],
          likes: [],
        };

        this._firestore.uploadPost(newPost).then(() => {
          this.loading = false;
        });
      } else {
        // caso contrario se actualiza el post
        this._firestore.updatePost(this.post?.publicationId, urlImage, comment);
      }
      this.loading = false;
      this.router.navigateByUrl(`/bodas/${weddingPath}/posts`);
    }
  }
}
