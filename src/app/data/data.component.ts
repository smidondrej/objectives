import { Component, OnInit } from '@angular/core';
import { BaseStation, Provision, Slice, Timesteps } from '../modules/api.module';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  public window!: number;
  public time!: number;
  public slice!: number;

  public base_stations!: Slice;
  public bs_number!: number;
  public timesteps!: Timesteps;
  public slice_number!: number;
  public slice_base_stations!: Array<number>;

  public provision!: Array<Provision>


  constructor(private apiService: DataService) { }

  async ngOnInit() {
    await this.fetchAll();
  }

  async fetchAll() {
    Promise.all([
      this.getTime(),
      this.getBSList(),
    ]);
  }

  getBSList() {
    const promise = new Promise((resolve, reject) =>  {
      this.apiService.getListOfBS().toPromise().then(
        (res: any) => {
          this.base_stations = res;
          this.bs_number = res.base_station.length
          console.log(this.bs_number)
          this.slice_number = this.maxSlice(res.base_station);
          console.log(this.slice_number)
        }
      )
    })
    return promise;
  }

  maxSlice(base_stations: Array<BaseStation>) {
    let maximum = 0;
    base_stations.forEach(function(bs) {
      if (bs.slice_id > maximum) {
        maximum = bs.slice_id
      }
    }); 
    return maximum + 1;
  }

  getTime() {
    const promise = new Promise((resolve, reject) =>  {
      this.apiService.getTimesptes(this.time, this.window).toPromise().then(
        (res: any) => {
          this.timesteps = res;
        }
      )
    })
    return promise;
  }

  async getSliceProv() {
    Promise.all([this.getSlice()]).then(
      (res: any) => {
        this.getBSProv(this.slice_base_stations[0])
      }
    )
  }

  getSlice() {
    const promise = new Promise((resolve, reject) =>  {
      this.apiService.getSlice(this.slice).toPromise().then(
        (res: any) => {
          let tmp = res;
          let array = new Array<number>();
          tmp.base_station.forEach(function(bs: BaseStation) {
            array.push(bs.id);
          });
          this.slice_base_stations = array;
          for (let i = 0; i < this.slice_base_stations.length; ++i) {
            this.getBSProv(this.slice_base_stations[i])
          }
        }
      )
    })
    return promise;
  }

  getBSProv(bs_id: number) {
    const promise = new Promise((resolve, reject) =>  {
      this.apiService.getProvision(bs_id, this.time, this.window).toPromise().then(
        (res: any) => {
          if (this.provision === undefined) {
            this.provision = new Array<Provision>();
          }
          this.provision.push(res);
        }
      )
    })
    return promise;
  }

  setParam() {
    if (this.slice !== undefined && this.slice !== null) {
      if (this.provision !== undefined) {
        this.provision = new Array<Provision>();
      }
      Promise.all([
        this.getTime(),
        this.getSliceProv()
      ]);
    }
    else {
      this.getTime();
    }
  }
}
