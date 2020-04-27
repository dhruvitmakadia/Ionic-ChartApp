import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Covid } from './covid';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  covidList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    private toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.createDb();
    }).catch(error => {
      console.log(error);
    });
  }

  createDb() {
    this.sqlite.create({
      name: 'covid.db',
      location: 'default'
    }).then(async (db: SQLiteObject) => {
      this.storage = db;
      console.log('COVID Database Created!');
      const toast = await this.toastController.create({
      message: 'Database Created !',
      duration: 2000
    });
      toast.present();
      this.getFakeData();
    }).catch(e => {
      alert('ERROR : ' + JSON.stringify(e));
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchCovid(): Observable<Chart[]> {
    return this.covidList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(() => {
          this.getCovid();
          this.isDbReady.next(true);
        })
        .catch(error => alert(JSON.stringify(error)));
    });
  }

  // Get list
  getCovid() {
    return this.storage.executeSql('SELECT * FROM covid', []).then(res => {
      const items: Covid[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            lable: res.rows.item(i).lable,
            confirmed: res.rows.item(i).confirmed,
            deceased: res.rows.item(i).deceased,
            recovered: res.rows.item(i).recovered
          });
        }
      }
      // alert(JSON.stringify(items));
      this.covidList.next(items);
    });
  }
}
