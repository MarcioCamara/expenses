import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { RevenueParameter } from '../models/revenue-parameter';

@Injectable({
  providedIn: 'root'
})
export class RevenueParameterService {
  private collection = 'revenues-parameter';

  constructor(
    private firestore: AngularFirestore,
  ) { }

  create(expense: RevenueParameter): Promise<void> {
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

  update(expense: RevenueParameter): void {
    this.firestore.collection(this.collection).doc(expense.id).update(expense);
  }

  delete(id: string): void {
    this.firestore.collection(this.collection).doc(id).delete();
  }
}
