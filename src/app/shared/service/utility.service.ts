import { DOCUMENT } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  //#region services
  public route: Router;
  private activatedRoute: ActivatedRoute;
  public modal: NzModalService;
  public msg: NzMessageService;
  public notification: NzNotificationService;
  public document: Document;
  title = "marah";
  public longDateFormat = 'yyyy-MM-dd hh:mm a';
  //#endregion


  constructor(injector: Injector) {
    this.route = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.modal = injector.get(NzModalService);
    this.msg = injector.get(NzMessageService);
    this.document = injector.get(DOCUMENT);
    this.notification = injector.get(NzNotificationService);
  }

  public navigate(url: string) {
    this.route.navigate([url]);
  }


  exportExcel(data) {    
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data); // Sale Data
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Leaves");
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });

      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

}