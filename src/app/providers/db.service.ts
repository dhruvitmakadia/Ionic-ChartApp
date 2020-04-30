import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';


@Injectable()
export class DbProvider {

  private database: any;
  private covid: any;

  constructor() {
    this.database = new PouchDB('covid');
  }

  public addCovid(id: string, data: string): Promise<string> {
    const promise = this.database
      .put({
        _id: id,
        note: data
      })
      .then((result): string => {
        return (result.id);
      });

    return (promise);
  }

  getCovid() {
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
