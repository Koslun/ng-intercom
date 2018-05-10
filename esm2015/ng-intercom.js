import { Inject, Injectable, PLATFORM_ID, Optional, isDevMode, Directive, HostListener, Input, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomConfig {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A provider with every Intercom.JS method
 */
class Intercom {
    /**
     * @param {?} config
     * @param {?} platformId
     * @param {?} router
     */
    constructor(config, platformId, router) {
        this.config = config;
        this.platformId = platformId;
        this.router = router;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        // Run load and attacht to window
        this.loadIntercom(config);
        // Subscribe to router changes
        if (config && config.updateOnRouterChange) {
            this.router.events.subscribe(event => {
                this.update();
            });
        }
        else if (isDevMode()) {
            console.warn(`
      Common practice in single page applications is to update whenever the route changes.
      ng-intercom supports this functionality out of the box just set 'updateOnRouterChange' to true in your Intercom Module config.
       This warning will not appear in production, if you choose not to use router updating.
     `);
        }
    }
    /**
     * If you'd like to control when Intercom is loaded, you can use the 'boot' method.
     * This is useful in situations like a one-page Javascript based application where the user may not be logged in
     * when the page loads. You call this method with the standard intercomSettings object.
     * @param {?=} intercomData
     * @return {?}
     */
    boot(intercomData) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const /** @type {?} */ data = Object.assign({}, intercomData, { app_id: this.config.appId });
        return (/** @type {?} */ (window)).Intercom('boot', data);
    }
    /**
     * If you have the Respond product (combined with another product like Engage)
     * you should call the Intercom shutdown method to clear your users’ conversations anytime they logout
     * of your application. Otherwise, the cookie we use to track who was most recently logged in on a given device
     * or computer will keep these conversations in the Messenger for one week.
     * This method will effectively clear out any user data that you have been passing through the JS API.
     * @return {?}
     */
    shutdown() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('shutdown');
    }
    /**
     * Calling the update method without any other arguments will trigger the JavaScript to look for new messages
     * that should be displayed to the current user (the one whose details are in the window.intercomSettings variable)
     * and show them if they exist.
     *
     * Calling the update method with a JSON object of user details will update those fields on the current user
     * in addition to logging an impression at the current URL and looking for new messages for the user.
     * @param {?=} data
     * @return {?}
     */
    update(data) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (data) {
            return (/** @type {?} */ (window)).Intercom('update', data);
        }
        else {
            return (/** @type {?} */ (window)).Intercom('update');
        }
    }
    /**
     * This will hide the main Messenger panel if it is open. It will not hide the Messenger Launcher.
     * @return {?}
     */
    hide() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('hide');
    }
    /**
     * This will show the Messenger. If there are no conversations it will open with the new message view,
     * if there are it will open with the message list.
     *
     * If a `message` parameter is supplied, it will automatically open a new message window, aliasing showNewMessage().
     *
     * @param {?=} message
     * @return {?}
     */
    show(message) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (message) {
            return (/** @type {?} */ (window)).Intercom('show');
        }
        else {
            return this.showNewMessage(message);
        }
    }
    /**
     * To open the message window with the message list you can call `showMessages()`.
     * @return {?}
     */
    showMessages() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('showMessages');
    }
    /**
     * To open the message window with the new message view you can call showNewMessage().
     *
     * This function takes an optional parameter that can be used to pre-populate the message composer as shown below.
     * @param {?=} message
     * @return {?}
     */
    showNewMessage(message) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (message) {
            return (/** @type {?} */ (window)).Intercom('showNewMessage', message);
        }
        else {
            return (/** @type {?} */ (window)).Intercom('showNewMessage');
        }
    }
    /**
     * You can submit an event using the trackEvent method.
     * This will associate the event with the currently logged in user and send it to Intercom.
     * The final parameter is a map that can be used to send optional metadata about the event.
     *
     * You can also add custom information to events in the form of event metadata.
     * @param {?} eventName
     * @param {?=} metadata
     * @return {?}
     */
    trackEvent(eventName, metadata) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (metadata) {
            return (/** @type {?} */ (window)).Intercom('trackEvent', eventName, metadata);
        }
        else {
            return (/** @type {?} */ (window)).Intercom('trackEvent', eventName);
        }
    }
    /**
     * A visitor is someone who goes to your site but does not use the messenger.
     * You can track these visitors via the visitor user_id.
     * This user_id can be used to retrieve the visitor or lead through the REST API.
     * @return {?}
     */
    getVisitorId() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('getVisitorId');
    }
    /**
     * Alias for getVisitorId()
     * \@alias getVisitorId()
     * \@readonly
     * @return {?}
     */
    get visitorId() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('getVisitorId');
    }
    /**
     * Gives you the ability to hook into the show event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    onShow(handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('onShow', handler);
    }
    /**
     * Gives you the ability to hook into the hide event. Requires a function argument.
     * @param {?} handler
     * @return {?}
     */
    onHide(handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('onHide', handler);
    }
    /**
     * This method allows you to register a function that will be called when the current number of unread messages changes.
     * @param {?} handler
     * @return {?}
     */
    onUnreadCountChange(handler) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        return (/** @type {?} */ (window)).Intercom('onUnreadCountChange', handler);
    }
    /**
     * @return {?}
     */
    l() {
        // if (!isPlatformBrowser(this.platformId)) {
        //   return
        // }
        const /** @type {?} */ d = document;
        const /** @type {?} */ s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = `https://widget.intercom.io/widget/${this.id}`;
        const /** @type {?} */ x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    loadIntercom(config) {
        // if (!isPlatformBrowser(this.platformId)) {
        //   return
        // }
        this.id = config.appId;
        const /** @type {?} */ w = /** @type {?} */ (window);
        const /** @type {?} */ ic = w.Intercom;
        if (typeof ic === 'function') {
            ic('reattach_activator');
            ic('update', config);
        }
        else {
            const /** @type {?} */ i = function () {
                i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
                i.q.push(args);
            };
            w.Intercom = i;
            if (w.attachEvent) {
                w.attachEvent('onload', this.l);
            }
            else {
                w.addEventListener('load', this.l, false);
            }
        }
    }
}
Intercom.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Intercom.ctorParameters = () => [
    { type: IntercomConfig, decorators: [{ type: Inject, args: [IntercomConfig,] },] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: Router, decorators: [{ type: Optional }, { type: Inject, args: [Router,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomHideDirective {
    /**
     * @param {?} intercom
     */
    constructor(intercom) {
        this.intercom = intercom;
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.intercomHide !== false) {
            this.intercom.hide();
        }
    }
}
IntercomHideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomHide]'
            },] },
];
/** @nocollapse */
IntercomHideDirective.ctorParameters = () => [
    { type: Intercom, },
];
IntercomHideDirective.propDecorators = {
    "intercomHide": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomShowMessagesDirective {
    /**
     * @param {?} intercom
     */
    constructor(intercom) {
        this.intercom = intercom;
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.intercomShowMessages !== false) {
            this.intercom.showMessages();
        }
    }
}
IntercomShowMessagesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShowMessages]'
            },] },
];
/** @nocollapse */
IntercomShowMessagesDirective.ctorParameters = () => [
    { type: Intercom, },
];
IntercomShowMessagesDirective.propDecorators = {
    "intercomShowMessages": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomShowNewMessageDirective {
    /**
     * @param {?} intercom
     */
    constructor(intercom) {
        this.intercom = intercom;
    }
    /**
     * @return {?}
     */
    onClick() {
        const /** @type {?} */ msg = this.message ? this.message : this.intercomShowNewMessage;
        if (msg) {
            this.intercom.showNewMessage(this.message);
        }
        else {
            this.intercom.showNewMessage();
        }
    }
}
IntercomShowNewMessageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShowNewMessage]'
            },] },
];
/** @nocollapse */
IntercomShowNewMessageDirective.ctorParameters = () => [
    { type: Intercom, },
];
IntercomShowNewMessageDirective.propDecorators = {
    "message": [{ type: Input },],
    "intercomShowNewMessage": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomShowDirective {
    /**
     * @param {?} intercom
     */
    constructor(intercom) {
        this.intercom = intercom;
    }
    /**
     * @return {?}
     */
    onClick() {
        const /** @type {?} */ msg = this.message ? this.message : this.intercomShow;
        if (msg) {
            this.intercom.showNewMessage(this.message);
        }
        else {
            this.intercom.show();
        }
    }
}
IntercomShowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShow]'
            },] },
];
/** @nocollapse */
IntercomShowDirective.ctorParameters = () => [
    { type: Intercom, },
];
IntercomShowDirective.propDecorators = {
    "message": [{ type: Input },],
    "intercomShow": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomShutdownDirective {
    /**
     * @param {?} intercom
     */
    constructor(intercom) {
        this.intercom = intercom;
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.intercomShutdown !== false) {
            this.intercom.shutdown();
        }
    }
}
IntercomShutdownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomShutdown]'
            },] },
];
/** @nocollapse */
IntercomShutdownDirective.ctorParameters = () => [
    { type: Intercom, },
];
IntercomShutdownDirective.propDecorators = {
    "intercomShutdown": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomTrackEventDirective {
    /**
     * @param {?} intercom
     */
    constructor(intercom) {
        this.intercom = intercom;
    }
    /**
     * @return {?}
     */
    onClick() {
        const /** @type {?} */ e = this.event ? this.event : this.intercomTrackEvent;
        if (e && this.metadata) {
            this.intercom.trackEvent(e, this.metadata);
        }
        else if (e && !this.metadata) {
            this.intercom.trackEvent(e);
        }
        else {
            throw new Error('Error in intercomTrackEvent directive: You must specify an event to track.');
        }
    }
}
IntercomTrackEventDirective.decorators = [
    { type: Directive, args: [{
                selector: '[intercomTrackEvent]'
            },] },
];
/** @nocollapse */
IntercomTrackEventDirective.ctorParameters = () => [
    { type: Intercom, },
];
IntercomTrackEventDirective.propDecorators = {
    "event": [{ type: Input },],
    "intercomTrackEvent": [{ type: Input },],
    "metadata": [{ type: Input },],
    "onClick": [{ type: HostListener, args: ['click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class IntercomModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: IntercomModule,
            providers: [
                { provide: IntercomConfig, useValue: config },
            ]
        };
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { Intercom, IntercomConfig, IntercomHideDirective, IntercomModule, IntercomShowDirective, IntercomShowMessagesDirective, IntercomShowNewMessageDirective, IntercomShutdownDirective, IntercomTrackEventDirective };
//# sourceMappingURL=ng-intercom.js.map
