import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Revenue } from '../models/revenue';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private collection = 'revenues';

  constructor(
    private firestore: AngularFirestore,
  ) { }

  create(revenue: Revenue): Promise<void> {
    return this.firestore.collection(this.collection).doc().set(revenue);
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
            month: new Date(data['month'].seconds * 1000),
          };

          return expense;
        }),
      ),
    );
  }

  update(revene: Revenue): void {
    this.firestore.collection(this.collection).doc(revene.id).update(revene);
  }

  delete(id: string): void {
    this.firestore.collection(this.collection).doc(id).delete();
  }
}
