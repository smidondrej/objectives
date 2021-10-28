import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string = "https://shrouded-stream-13128.herokuapp.com";

  constructor(private http: HttpClient) { }

  getListOfBS() {
    console.log("call API to get list of BS @ " + this.url + "/bs")
    return this.http.get(this.url + "/bs")
      .pipe((response) => response);
  }

  getBS(bs_id: number) {
    console.log("call API to get BS" + bs_id + " @ " + this.url + "/bs/" + bs_id)
    return this.http.get(this.url + "/bs/" + bs_id)
      .pipe((response) => response);
  }

  getSlice(slice_id: number) {
    console.log("call API to get Slice @ " + this.url + "/slice/" + slice_id)
    return this.http.get(this.url + "/slice/" + slice_id)
      .pipe((response) => response);
  }

  getProvision(bs_id: number, time?: number, window?: number) {
    if ((window === undefined || window === null) && (time !== undefined && time !== null)) {
      console.log("call API to get Provision of BS" + bs_id + " from time " + time + " @ " + this.url + "/provision/" + bs_id + "/time=" + time)
      return this.http.get(this.url + "/provision/" + bs_id + "/time=" + time)
        .pipe((response) => response);
    }
    else if ((window !== undefined && window !== null) && (time === undefined || time === null)) {
      console.log("call API to get Provision of BS" + bs_id + " from time " + 0 + " for window " + window + " @ " + this.url + "/provision/" + bs_id + "/time=" + 0 + "/window=" + window)
      return this.http.get(this.url + "/provision/" + bs_id + "/time=" + 0 + "/window=" + window)
        .pipe((response) => response);
    }
    else if ((time === undefined || time === null) && (window === undefined || window === null)) {
      console.log("call API to get Provision of BS" + bs_id + " @ " + this.url + "/provision/" + bs_id)
      return this.http.get(this.url + "/provision/" + bs_id)
        .pipe((response) => response);
    }
    else {
      console.log("call API to get Provision of BS" + bs_id + " from time " + time + " for window " + window + " @ " + this.url + "/provision/" + bs_id + "/time=" + time + "/window=" + window)
      return this.http.get(this.url + "/provision/" + bs_id + "/time=" + time + "/window=" + window)
        .pipe((response) => response);
    }
  }

  getTimesptes(time?: number, window?: number): Observable<any> {
    if ((time === undefined || time === null) && (window === undefined || window === null)) {
      console.log("call API to get Timestep @ " + this.url + "/timesteps")
      return this.http.get(this.url + "/timesteps")
        .pipe((response: any) => {return response});
    }
    else if ((window === undefined || window === null) && (time !== undefined && time !== null)) {
      console.log("call API to get Timestep from time " + time + " @ " + this.url + "/timesteps/time=" + time)
      return this.http.get(this.url + "/timesteps/time=" + time)
        .pipe((response) => response);
    }
    else if ((window !== undefined && window !== null) && (time === undefined || time === null)) {
      console.log("call API to get Timestep from time " + 0 + " for window " + window + " @ " + this.url + "/timesteps/time=" + 0 + "/window=" + window)
      return this.http.get(this.url + "/timesteps/time=" + 0 + "/window=" + window)
        .pipe((response) => response);
    }
    else {
      console.log("call API to get Timestep from time " + time + " for window " + window + " @ " + this.url + "/timesteps/time=" + time + "/window=" + window)
      return this.http.get(this.url + "/timesteps/time=" + time + "/window=" + window)
        .pipe((response) => response);
    }
  }
}
