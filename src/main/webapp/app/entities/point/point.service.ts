import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IPoint } from 'app/shared/model/point.model';

type EntityResponseType = HttpResponse<IPoint>;
type EntityArrayResponseType = HttpResponse<IPoint[]>;

@Injectable({ providedIn: 'root' })
export class PointService {
  public resourceUrl = SERVER_API_URL + 'api/points';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/points';

  constructor(protected http: HttpClient) {}

  create(point: IPoint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(point);
    return this.http
      .post<IPoint>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(point: IPoint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(point);
    return this.http
      .put<IPoint>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPoint>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPoint[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPoint[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(point: IPoint): IPoint {
    const copy: IPoint = Object.assign({}, point, {
      date: point.date && point.date.isValid() ? point.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((point: IPoint) => {
        point.date = point.date ? moment(point.date) : undefined;
      });
    }
    return res;
  }
}
