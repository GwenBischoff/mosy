import {Component, AfterViewInit} from "angular2/core";

import {NameFilterPipe} from "./namefilter.pipe"
import {AmountPipe} from "./amount.pipe" 
import {LinePipe} from "./line.pipe"

@Component({
    //template:"<user></user><admin></admin>",
    templateUrl:"app/app.component.html",
    selector:"my-app",
    pipes:[NameFilterPipe, AmountPipe,LinePipe]
})
export class AppComponent implements AfterViewInit{
    
    logFilter:string;
    contentFilter:string;
    fromLine:number;
    toLine:number;

    dropSelection:string;
    logFiles:string[] = [];
    fileContent:string[];

    socket:any;
    ngAfterViewInit() {
        this.socket = io.connect("/server/logging");
        this.socket.on("logs", (data) => {
            this.logFiles = data        
        })
        this.socket.on("data", (data)=> {
            this.fileContent = data.match(/[^\r\n]+/g);
            for(let i=0; i<this.fileContent.length;i++) {
                this.fileContent[i] = "["+i+"]"+this.fileContent[i];
            }
        })
    }

    logClicked(name:string) {

        this.socket.emit("request", name);
    }

    back() {
        this.fileContent = undefined;
        this.dropSelection=undefined;
    }

    onChange(value) {
       this.dropSelection = document.getElementById("range").value
    }



}

