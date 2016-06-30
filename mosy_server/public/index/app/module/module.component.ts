import {Component, Input} from "angular2/core"

import {Module} from "./module"
@Component({
    styleUrls:["app/module/module.component.css"],
    templateUrl:"app/module/module.component.html",
    selector:"mod"
})
export class ModuleComponent{

    @Input()
    module:Module;

    onclick() {

        window.location.href =this.module.name;

    }
}