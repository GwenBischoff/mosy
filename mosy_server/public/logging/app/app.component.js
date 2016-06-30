System.register(["angular2/core", "./namefilter.pipe", "./amount.pipe", "./line.pipe"], function(exports_1, context_1) {
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
    var core_1, namefilter_pipe_1, amount_pipe_1, line_pipe_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (namefilter_pipe_1_1) {
                namefilter_pipe_1 = namefilter_pipe_1_1;
            },
            function (amount_pipe_1_1) {
                amount_pipe_1 = amount_pipe_1_1;
            },
            function (line_pipe_1_1) {
                line_pipe_1 = line_pipe_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.logFiles = [];
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.socket = io.connect("/server/logging");
                    this.socket.on("logs", function (data) {
                        _this.logFiles = data;
                    });
                    this.socket.on("data", function (data) {
                        _this.fileContent = data.match(/[^\r\n]+/g);
                        for (var i = 0; i < _this.fileContent.length; i++) {
                            _this.fileContent[i] = "[" + i + "]" + _this.fileContent[i];
                        }
                    });
                };
                AppComponent.prototype.logClicked = function (name) {
                    this.socket.emit("request", name);
                };
                AppComponent.prototype.back = function () {
                    this.fileContent = undefined;
                    this.dropSelection = undefined;
                };
                AppComponent.prototype.onChange = function (value) {
                    this.dropSelection = document.getElementById("range").value;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        //template:"<user></user><admin></admin>",
                        templateUrl: "app/app.component.html",
                        selector: "my-app",
                        pipes: [namefilter_pipe_1.NameFilterPipe, amount_pipe_1.AmountPipe, line_pipe_1.LinePipe]
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