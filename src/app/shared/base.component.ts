import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injector } from "@angular/core";
import { AuthService } from "./proxy/Auth/auth.service";
import { UtilityService } from "./service/utility.service";




export abstract class BaseComponent {
    //#region variables
    utility: UtilityService;
    HttpClient: HttpClient;
    HttpHeader : HttpHeaders;
    pathUrl: string;
    AuthService:AuthService;

    constructor(injector: Injector) {
        this.utility = injector.get(UtilityService);
        this.HttpClient = injector.get(HttpClient);
        this.pathUrl = "https://api.amn-dm.com";
        this.AuthService = injector.get(AuthService);
    }


    setTimeZone(date, utc?) {
        if (utc) {
            return date?.toLocalISOString() // send local date to api
        } else {
            return date?.toLocalString() // shift time to utc before sending and send shifted time to 0 timezone
        }
    }

    // get isUser(){
    //     return this.AuthService.isUser()
    // }
    // get isOwner(){
    //     return this.AuthService.isOwner()
    // }
    get getUserName(){
        return localStorage.getItem('userName')
    }
}