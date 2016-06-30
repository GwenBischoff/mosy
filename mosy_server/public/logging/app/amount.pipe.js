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
    var AmountPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AmountPipe = (function () {
                function AmountPipe() {
                }
                AmountPipe.prototype.transform = function (toFilter, filter) {
                    var returnVal = [];
                    if (filter[0] == "all" || filter[0] == undefined) {
                        returnVal = toFilter;
                    }
                    else if (filter[0] == "latest") {
                        returnVal.push(toFilter[toFilter.length - 1]);
                    }
                    else if (filter[0] == "10") {
                        for (var i = 0; i < 10 && i < toFilter.length; i++)
                            returnVal.push(toFilter[i]);
                    }
                    else if (filter[0] == "20") {
                        for (var i = 0; i < 20 && i < toFilter.length; i++)
                            returnVal.push(toFilter[i]);
                    }
                    return returnVal;
                };
                AmountPipe = __decorate([
                    core_1.Pipe({ name: "amountfilter" }), 
                    __metadata('design:paramtypes', [])
                ], AmountPipe);
                return AmountPipe;
            }());
            exports_1("AmountPipe", AmountPipe);
        }
    }
});
//# sourceMappingURL=amount.pipe.js.map