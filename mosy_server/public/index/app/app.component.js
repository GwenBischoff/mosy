System.register(["angular2/core", "./module/module.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, module_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (module_component_1_1) {
                module_component_1 = module_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.modules = [];
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    var socket = io.connect("/server/index");
                    socket.on("modules", function (data) {
                        _this.modules = data;
                        console.log(_this.modules[0]);
                    });
                };
                AppComponent.prototype.moduleClicked = function (link) {
                    window.location.href = link;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        //template:"<user></user><admin></admin>",
                        templateUrl: "app/app.component.html",
                        selector: "my-app",
                        directives: [module_component_1.ModuleComponent],
                        styleUrls: ["app/normalize.css", "app/style.css", "app/app.component.css"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map