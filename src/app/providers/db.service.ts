import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { LoadingController } from '@ionic/angular';


@Injectable()
export class DbProvider {

  private database: any;
  private covid: any;

  constructor(
    public loadingController: LoadingController
  ) {
    this.database = new PouchDB('covid');
  }

  public loadData(): void {
    console.log('COVID');
    let i = 1;
    let arr = [];
    this.database.info().then((details) => {
      if (details.doc_count === 0 && details.update_seq === 0) {
        while (i <= 1000) {
          arr.push({ _id: `${i}`, lable: `${i}`, confirmed: 10, deceased: 4, recovered: 6 });
          console.log(i);
          i++;
        }
        this.database.bulkDocs(arr);
        console.log('database does not exist');
      } else {
        console.log('database exists');
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

  async getCovid() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    if (await loading.onDidDismiss()) {
      console.log('loder off');
      return new Promise(resolve => {
        this.database.allDocs({
          include_docs: true,
          attachments: true
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
}
