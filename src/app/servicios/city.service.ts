import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class CityService {
  url = environment.url;
  segment = '/ciudad/api/v2/cities/';
  port = environment.port;

  constructor(private _httpClient: HttpClient) {
  }

  find(query: string): Observable<any> {
    const url = `${this.url}:${this.port}${this.segment}?search=${query}`;
    return this._httpClient.get(url).pipe(
      mergeMap(
        (respuesta: any) => {
          return of(respuesta.results);
        }
      )
    );
  }
}
