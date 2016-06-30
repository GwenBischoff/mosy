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
    var NameFilterPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            NameFilterPipe = (function () {
                function NameFilterPipe() {
                }
                NameFilterPipe.prototype.transform = function (toFilter, filter) {
                    if (filter[0] == undefined)
                        return toFilter;
                    return toFilter.filter(function (item) { return item.indexOf(filter[0]) != -1; });
                };
                NameFilterPipe = __decorate([
                    core_1.Pipe({ name: "namefilter" }), 
                    __metadata('design:paramtypes', [])
                ], NameFilterPipe);
                return NameFilterPipe;
            }());
            exports_1("NameFilterPipe", NameFilterPipe);
        }
    }
});
//# sourceMappingURL=namefilter.pipe.js.map