import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'angular-firebase';
  public data: any = []
  constructor(public firestore: Firestore) {
    this.getData()
  }
  addData(value: any) {
    const dbInstance = collection(this.firestore, 'users');
    console.log(value);
    addDoc(dbInstance, value)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  getData() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }

  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'users', id);
    updateDoc(dataToUpdate, {
      name: 'updated new task'
    })
      .then(() => {
        alert('Data updated');
        this.getData()
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'users', id);
    deleteDoc(dataToDelete)
    .then(() => {
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  ngOnInit(): void {
  }

}
