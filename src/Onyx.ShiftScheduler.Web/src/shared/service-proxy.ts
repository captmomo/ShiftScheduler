﻿/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.18.6.0 (NJsonSchema v9.10.67.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})
export class SchedulesClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:44019";
    }

    get(): Observable<ScheduleDto | null> {
        let url_ = this.baseUrl + "/v1/Schedules";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<ScheduleDto | null>><any>_observableThrow(e);
                }
            } else
                return <Observable<ScheduleDto | null>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<ScheduleDto | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ScheduleDto.fromJS(resultData200) : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<ScheduleDto | null>(<any>null);
    }
}

export class ScheduleDto implements IScheduleDto {
    name?: string | undefined;
    startDate!: moment.Moment;
    endDate!: moment.Moment;
    shifts?: ShiftDto[] | undefined;
    statistics?: string | undefined;
    days!: number;

    constructor(data?: IScheduleDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            if (data["shifts"] && data["shifts"].constructor === Array) {
                this.shifts = [];
                for (let item of data["shifts"])
                    this.shifts.push(ShiftDto.fromJS(item));
            }
            this.statistics = data["statistics"];
            this.days = data["days"];
        }
    }

    static fromJS(data: any): ScheduleDto {
        data = typeof data === 'object' ? data : {};
        let result = new ScheduleDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        if (this.shifts && this.shifts.constructor === Array) {
            data["shifts"] = [];
            for (let item of this.shifts)
                data["shifts"].push(item.toJSON());
        }
        data["statistics"] = this.statistics;
        data["days"] = this.days;
        return data; 
    }
}

export interface IScheduleDto {
    name?: string | undefined;
    startDate: moment.Moment;
    endDate: moment.Moment;
    shifts?: ShiftDto[] | undefined;
    statistics?: string | undefined;
    days: number;
}

export class ShiftDto implements IShiftDto {
    employee?: string | undefined;
    startDate!: moment.Moment;
    endDate!: moment.Moment;
    type!: ShiftType;

    constructor(data?: IShiftDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.employee = data["employee"];
            this.startDate = data["startDate"] ? moment(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? moment(data["endDate"].toString()) : <any>undefined;
            this.type = data["type"];
        }
    }

    static fromJS(data: any): ShiftDto {
        data = typeof data === 'object' ? data : {};
        let result = new ShiftDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["employee"] = this.employee;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        data["type"] = this.type;
        return data; 
    }
}

export interface IShiftDto {
    employee?: string | undefined;
    startDate: moment.Moment;
    endDate: moment.Moment;
    type: ShiftType;
}

export enum ShiftType {
    Day = "Day", 
    Night = "Night", 
    Off = "Off", 
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = function() { 
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob); 
        }
    });
}