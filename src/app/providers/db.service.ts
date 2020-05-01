import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { LoadingController } from '@ionic/angular';
import { timestamp } from 'rxjs/operators';


@Injectable()
export class DbProvider {

  private database: any;
  private covid: any;

  constructor(
    public loadingController: LoadingController
  ) {
    this.database = new PouchDB('covid');
  }

  public randomData(): number {
    return Math.floor(Math.random() * 100);
  }

  public loadData(): void {
    let i = 1;
    const arr = [];
    this.database.info().then(async (details) => {
      if (details.doc_count === 0 && details.update_seq === 0) {
        while (i <= 1000) {
          arr.push({ _id: `${i}`, label: `${i}`, confirmed: this.randomData(), deceased: this.randomData(), recovered: this.randomData() });
          i++;
        }
        this.database.bulkDocs(arr);
        const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 900
        });
        await loading.present();
        await loading.onDidDismiss();
        console.log('New Data Loaded');
      } else {
        console.log('Old Data Loaded');
      }
    }).catch((err) => {
      console.log('error: ' + err);
      return;
    });
  }

  public addCovid(data): Promise<string> {
    const promise = this.database
      .put(data)
      .then((result): string => {
        return (result.id);
      });

    return (promise);
  }

  async getCovid(start: number, end: number) {
    const arr = [];
    for (let i = start + 1; i <= end; i++) {
      arr.push(`${i}`);
    }
    return new Promise(resolve => {
      this.database.allDocs({
        include_docs: true,
        attachments: true,
        keys: arr
      }).then((result) => {
        // handle result
        this.covid = result.rows;
        resolve(this.covid);

      }).catch((err) => {
        console.log(err);
      });
    });
  }
}
