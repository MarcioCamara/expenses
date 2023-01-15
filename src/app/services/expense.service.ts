import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private collection = 'expenses';

  constructor(
    private firestore: AngularFirestore,
  ) { }

  create(expense: Expense): Promise<void> {
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
            month: new Date(data['month'].seconds * 1000),
          };

          return expense;
        }),
      ),
    );
  }

  update(expense: Expense): void {
    this.firestore.collection(this.collection).doc(expense.id).update(expense);
  }

  delete(id: string): void {
    this.firestore.collection(this.collection).doc(id).delete();
  }
}
