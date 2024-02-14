// import { Injectable } from '@angular/core';
// import { FirebaseService } from '@app/services/firebase.service';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { EMPTY } from 'rxjs';
// import { map, catchError, mergeMap } from 'rxjs/operators';
// import { weddingActionsType } from '../actions/wedding.actions';
// import { ActivatedRoute } from '@angular/router';

// @Injectable()
// export class WeddingEffects {
//   loadWedding$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(weddingActionsType.loadWedding),
//       mergeMap(() =>
//         // Suscripción a los parámetros de la URL dentro del efecto
//         this.route.paramMap.pipe(
//           mergeMap((params) => {
//             console.log(params);
//             // Obtén el parámetro de la URL
//             const weddingName = params.get('weddingName');

//             // Llama al servicio Firebase con el parámetro de la URL
//             return this.firebaseServices.getPosts(weddingName).pipe(
//               map((weddings) => {
//                 const wedding = weddings.filter(
//                   (wed) => wed['weddingName'] === weddingName
//                 )[0];
//                 return { type: weddingActionsType.setWedding, wedding };
//               }),
//               catchError(() => EMPTY)
//             );
//           })
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private firebaseServices: FirebaseService,
//     private route: ActivatedRoute
//   ) {}
// }
