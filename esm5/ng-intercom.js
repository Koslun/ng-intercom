import { Inject, Injectable, PLATFORM_ID, Optional, isDevMode, Directive, HostListener, Input, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

var IntercomConfig = /** @class */ (function () {
    function IntercomConfig() {
    }
    return IntercomConfig;
}());
var Intercom = /** @class */ (function () {
    function Intercom(config, platformId, router) {
        var _this = this;
        this.config = config;
        this.platformId = platformId;
        this.router = router;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.loadIntercom(config);
        if (config && config.updateOnRouterChange) {
            this.router.events.subscribe(function (event) {
                _this.update();
            });
        }
        else if (isDevMode()) {
            console.warn("\n      Common practice in single page applications is to update whenever the route changes.\n      ng-intercom supports this functionality out of the box just set 'updateOnRouterChange' to true in your Intercom Module config.\n       This warning will not appear in production, if you choose not to use router updating.\n     ");
        }
    }
    Intercom.prototype.boot = function (intercomData) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        var data = Object.assign({}, intercomData, { app_id: this.config.appId });
        return ((window)).Intercom('boot', data);
    };
    Intercom.prototype.shutdown = function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return ((window)).Intercom('shutdown');
    };
    Intercom.prototype.update = function (data) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (data) {
            return ((window)).Intercom('update', data);
        }
        else {
            return ((window)).Intercom('update');
        }
    };
    Intercom.prototype.hide = function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return ((window)).Intercom('hide');
    };
    Intercom.prototype.show = function (message) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (message) {
            return ((window)).Intercom('show');
        }
        else {
            return this.showNewMessage(message);
        }
    };
    Intercom.prototype.showMessages = function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return ((window)).Intercom('showMessages');
    };
    Intercom.prototype.showNewMessage = function (message) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (message) {
            return ((window)).Intercom('showNewMessage', message);
        }
        else {
            return ((window)).Intercom('showNewMessage');
        }
    };
    Intercom.prototype.trackEvent = function (eventName, metadata) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (metadata) {
            return ((window)).Intercom('trackEvent', eventName, metadata);
        }
        else {
            return ((window)).Intercom('trackEvent', eventName);
        }
    };
    Intercom.prototype.getVisitorId = function () {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return ((window)).Intercom('getVisitorId');
    };
    Object.defineProperty(Intercom.prototype, "visitorId", {
        get: function () {
            if (!isPlatformBrowser(this.platformId)) {
                return;
            }
            return ((window)).Intercom('getVisitorId');
        },
        enumerable: true,
        configurable: true
    });
    Intercom.prototype.onShow = function (handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return ((window)).Intercom('onShow', handler);
    };
    Intercom.prototype.onHide = function (handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return ((window)).Intercom('onHide', handler);
    };
    Intercom.prototype.onUnreadCountChange = function (handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return ((window)).Intercom('onUnreadCountChange', handler);
    };
    Intercom.prototype.l = function () {
        var d = document;
        var s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = "https://widget.intercom.io/widget/" + this.id;
        var x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    };
    Intercom.prototype.loadIntercom = function (config) {
        this.id = config.appId;
        var w = (window);
        var ic = w.Intercom;
        if (typeof ic === 'function') {
            ic('reattach_activator');
            ic('update', config);
        }
        else {
            var i_1 = function () {
                i_1.c(arguments);
            };
            i_1.q = [];
            i_1.c = function (args) {
                i_1.q.push(args);
            };
            w.Intercom = i_1;
            if (w.attachEvent) {
                w.attachEvent('onload', this.l);
            }
            else {
                w.addEventListener('load', this.l, false);
            }
        }
    };
    return Intercom;
}());
Intercom.decorators = [
    { type: Injectable },
];
Intercom.ctorParameters = function () { return [
    { type: IntercomConfig, decorators: [{ type: Inject, args: [IntercomConfig,] },] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: Router, decorators: [{ type: Optional }, { type: Inject, args: [Router,] },] },
]; };
var IntercomHideDirective = /** @class */ (function () {
    function IntercomHideDirective(intercom) {
        this.intercom = intercom;
    }
    IntercomHideDirective.prototype.onClick = function () {
        if (this.intercomHide !== false) {
            this.intercom.hide();
        }
    };
    return IntercomHideDirective;
}());
IntercomHideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomHide]'
            },] },
];
IntercomHideDirective.ctorParameters = function () { return [
    { type: Intercom, },
]; };
IntercomHideDirective.propDecorators = {
    "intercomHide": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};
var IntercomShowMessagesDirective = /** @class */ (function () {
    function IntercomShowMessagesDirective(intercom) {
        this.intercom = intercom;
    }
    IntercomShowMessagesDirective.prototype.onClick = function () {
        if (this.intercomShowMessages !== false) {
            this.intercom.showMessages();
        }
    };
    return IntercomShowMessagesDirective;
}());
IntercomShowMessagesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShowMessages]'
            },] },
];
IntercomShowMessagesDirective.ctorParameters = function () { return [
    { type: Intercom, },
]; };
IntercomShowMessagesDirective.propDecorators = {
    "intercomShowMessages": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};
var IntercomShowNewMessageDirective = /** @class */ (function () {
    function IntercomShowNewMessageDirective(intercom) {
        this.intercom = intercom;
    }
    IntercomShowNewMessageDirective.prototype.onClick = function () {
        var msg = this.message ? this.message : this.intercomShowNewMessage;
        if (msg) {
            this.intercom.showNewMessage(this.message);
        }
        else {
            this.intercom.showNewMessage();
        }
    };
    return IntercomShowNewMessageDirective;
}());
IntercomShowNewMessageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShowNewMessage]'
            },] },
];
IntercomShowNewMessageDirective.ctorParameters = function () { return [
    { type: Intercom, },
]; };
IntercomShowNewMessageDirective.propDecorators = {
    "message": [{ type: Input },],
    "intercomShowNewMessage": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};
var IntercomShowDirective = /** @class */ (function () {
    function IntercomShowDirective(intercom) {
        this.intercom = intercom;
    }
    IntercomShowDirective.prototype.onClick = function () {
        var msg = this.message ? this.message : this.intercomShow;
        if (msg) {
            this.intercom.showNewMessage(this.message);
        }
        else {
            this.intercom.show();
        }
    };
    return IntercomShowDirective;
}());
IntercomShowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShow]'
            },] },
];
IntercomShowDirective.ctorParameters = function () { return [
    { type: Intercom, },
]; };
IntercomShowDirective.propDecorators = {
    "message": [{ type: Input },],
    "intercomShow": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};
var IntercomShutdownDirective = /** @class */ (function () {
    function IntercomShutdownDirective(intercom) {
        this.intercom = intercom;
    }
    IntercomShutdownDirective.prototype.onClick = function () {
        if (this.intercomShutdown !== false) {
            this.intercom.shutdown();
        }
    };
    return IntercomShutdownDirective;
}());
IntercomShutdownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShutdown]'
            },] },
];
IntercomShutdownDirective.ctorParameters = function () { return [
    { type: Intercom, },
]; };
IntercomShutdownDirective.propDecorators = {
    "intercomShutdown": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};
var IntercomTrackEventDirective = /** @class */ (function () {
    function IntercomTrackEventDirective(intercom) {
        this.intercom = intercom;
    }
    IntercomTrackEventDirective.prototype.onClick = function () {
        var e = this.event ? this.event : this.intercomTrackEvent;
        if (e && this.metadata) {
            this.intercom.trackEvent(e, this.metadata);
        }
        else if (e && !this.metadata) {
            this.intercom.trackEvent(e);
        }
        else {
            throw new Error('Error in intercomTrackEvent directive: You must specify an event to track.');
        }
    };
    return IntercomTrackEventDirective;
}());
IntercomTrackEventDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomTrackEvent]'
            },] },
];
IntercomTrackEventDirective.ctorParameters = function () { return [
    { type: Intercom, },
]; };
IntercomTrackEventDirective.propDecorators = {
    "event": [{ type: Input },],
    "intercomTrackEvent": [{ type: Input },],
    "metadata": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};
var IntercomModule = /** @class */ (function () {
    function IntercomModule() {
    }
    IntercomModule.forRoot = function (config) {
        return {
            ngModule: IntercomModule,
            providers: [
                { provide: IntercomConfig, useValue: config },
            ]
        };
    };
    return IntercomModule;
}());
IntercomModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    RouterModule
                ],
                declarations: [
                    IntercomHideDirective,
                    IntercomShowMessagesDirective,
                    IntercomShowNewMessageDirective,
                    IntercomShowDirective,
                    IntercomShutdownDirective,
                    IntercomTrackEventDirective
                ],
                exports: [
                    IntercomHideDirective,
                    IntercomShowMessagesDirective,
                    IntercomShowNewMessageDirective,
                    IntercomShowDirective,
                    IntercomShutdownDirective,
                    IntercomTrackEventDirective
                ],
                providers: [
                    Intercom
                ]
            },] },
];

export { Intercom, IntercomConfig, IntercomHideDirective, IntercomModule, IntercomShowDirective, IntercomShowMessagesDirective, IntercomShowNewMessageDirective, IntercomShutdownDirective, IntercomTrackEventDirective };
//# sourceMappingURL=ng-intercom.js.map