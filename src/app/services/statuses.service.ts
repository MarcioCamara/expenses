import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  private collection = 'statuses';

  constructor(
    private firestore: AngularFirestore,
  ) { }

  create(expense: Status): Promise<void> {
    return this.firestore.collection(this.collection).doc().set(expense);
  }

  getAll(): Observable<any> {
    return this.firestore.collection(this.collection).snapshotChanges().pipe(
      map(changes =>
        changes.map(change => {
          const data = change.payload.doc.data()

          const expense = {
            id: change.payload.doc.id,
            checked: false,
            ...change.payload.doc.data() as Object,
          };

          return expense;
        }),
      ),
    );
  }

  update(expense: Status): void {
    this.firestore.collection(this.collection).doc(expense.id).update(expense);
  }

  delete(id: string): void {
    this.firestore.collection(this.collection).doc(id).delete();
  }
}
