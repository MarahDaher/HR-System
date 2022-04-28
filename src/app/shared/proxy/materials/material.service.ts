import { Injectable, Injector } from '@angular/core';
import * as moment from 'moment';
import { BaseComponent } from '../../base.component';

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends BaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  getMaterial() {
    return this.HttpClient.get<any>(this.pathUrl + `/MaterialTypes`);
  }

  editMaterial(material) { 
    let materials = {
      id: material?.id,
      enName: material?.enName,
      arName: material?.arName,
      createdDate: moment(material?.createdDate).format("YYYY-MM-DD HH:mm:ss")
    };
    return this.HttpClient.put<any>(this.pathUrl + `/MaterialTypes`, materials);
  }

  addMaterial(material) {
    let materials = {
      id: material?.id,
      enName: material?.enName,
      arName: material?.arName,
      createdDate: moment(material?.createdDate).format("YYYY-MM-DD HH:mm:ss")
    };
    return this.HttpClient.post<any>(this.pathUrl + `/MaterialTypes`, materials);
  }

  deleteMaterial(id) { 
    return this.HttpClient.delete<any>(this.pathUrl + `/MaterialTypes?id=${id}`);

  }

}
