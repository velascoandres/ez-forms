import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class WikipediaRestService {
  url = environment.url;
  port = environment.port;

  constructor(private _httpClient: HttpClient) {
  }

  find(query: string): Observable<any> {
    const url = `${this.url}&srsearch=${query}`;
    return this._httpClient.get(url).pipe(
      mergeMap(
        (respuesta: any) => {
          if (respuesta.query) {
            return of(respuesta.query.search);
          }
          return of([]);
        }
      )
    );
  }
}
