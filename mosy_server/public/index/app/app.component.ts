import {Component, AfterViewInit} from "angular2/core";

import {ModuleComponent} from "./module/module.component"
import {Module} from "./module/module";

@Component({
    //template:"<user></user><admin></admin>",
    templateUrl:"app/app.component.html",
    selector:"my-app",
    directives:[ModuleComponent],
    styleUrls:["app/normalize.css", "app/style.css", "app/app.component.css"]
})
export class AppComponent implements AfterViewInit{
    
    modules:Module[] = [];

    ngAfterViewInit() {
        var socket = io.connect("/server/index");
        socket.on("modules", (data) => {
            this.modules = data;
            console.log(this.modules[0]);
            
        })
    }

    moduleClicked(link:string){
          window.location.href =link;
    }



}

