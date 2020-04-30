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

  public addCovid(id: string, data: string, con: number, dec: number, rec: number): Promise<string> {
    const promise = this.database
      .put({
        _id: id,
        lable: data,
        confirmed: con,
        deceased: dec,
        recovered: rec
      })
      .then((result): string => {
        return (result.id);
      });

    return (promise);
  }

  async getCovid() {
    let i = 1;
    this.database.info().then((details) => {
      if (details.doc_count === 0 && details.update_seq === 0) {
        while (i <= 1000) {
          this.addCovid(`${i}`, `${i}`, 10, 6, 4);
          i++;
        }
        console.log('database does not exist');
      } else {
        console.log('database exists');
      }
    }).catch((err) => {
      console.log('error: ' + err);
      return;
    });
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 500
    });
    await loading.present();
    await loading.onDidDismiss();
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
