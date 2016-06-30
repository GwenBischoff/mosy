System.register(["angular2/core"], function(exports_1, context_1) {
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
    var core_1;
    var ModuleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ModuleComponent = (function () {
                function ModuleComponent() {
                }
                ModuleComponent.prototype.onclick = function () {
                    window.location.href = this.module.name;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ModuleComponent.prototype, "module", void 0);
                ModuleComponent = __decorate([
                    core_1.Component({
                        styleUrls: ["app/module/module.component.css"],
                        templateUrl: "app/module/module.component.html",
                        selector: "mod"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ModuleComponent);
                return ModuleComponent;
            }());
            exports_1("ModuleComponent", ModuleComponent);
        }
    }
});
//# sourceMappingURL=module.component.js.map