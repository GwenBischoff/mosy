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
    var LinePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LinePipe = (function () {
                function LinePipe() {
                }
                LinePipe.prototype.transform = function (toFilter, filter) {
                    var returnVal = [];
                    if (filter[0] == undefined && filter[1] == undefined) {
                        returnVal = toFilter;
                    }
                    else {
                        var startLine = (filter[0] == undefined || filter[0] == "") ? 0 : filter[0];
                        var endLine = (filter[1] == undefined || filter[1] == "") ? toFilter.length : Number(filter[1]) + 1;
                        console.log(startLine);
                        for (var i = Number(startLine); i < endLine && i < toFilter.length; i++) {
                            returnVal.push(toFilter[i]);
                        }
                    }
                    return returnVal;
                };
                LinePipe.prototype.isNumeric = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                };
                LinePipe = __decorate([
                    core_1.Pipe({ name: "linefilter" }), 
                    __metadata('design:paramtypes', [])
                ], LinePipe);
                return LinePipe;
            }());
            exports_1("LinePipe", LinePipe);
        }
    }
});
//# sourceMappingURL=line.pipe.js.map