import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  getDataByCategory(menuName: string) {
    return this.firestore.collection(menuName).valueChanges();
  }

  sendOrderToKitchen(obj: { customerName: string; tableNumber: number; delivery: boolean; date: any; order: {}; }) {
    return this.firestore.collection('kitchen').add(obj);
  }
}
