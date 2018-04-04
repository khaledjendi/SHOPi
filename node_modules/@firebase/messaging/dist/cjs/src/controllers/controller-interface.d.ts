import TokenDetailsModel from '../models/token-details-model';
import VapidDetailsModel from '../models/vapid-details-model';
import IIDModel from '../models/iid-model';
export declare const TOKEN_EXPIRATION_MILLIS: number;
export default class ControllerInterface {
    app: any;
    INTERNAL: any;
    protected errorFactory_: any;
    private messagingSenderId_;
    private tokenDetailsModel_;
    private vapidDetailsModel_;
    private iidModel_;
    /**
     * An interface of the Messaging Service API
     * @param {!firebase.app.App} app
     */
    constructor(app: any);
    /**
     * @export
     */
    getToken(): Promise<string | null>;
    /**
     * manageExistingToken is triggered if there's an existing FCM token in the
     * database and it can take 3 different actions:
     * 1) Retrieve the existing FCM token from the database.
     * 2) If VAPID details have changed: Delete the existing token and create a
     * new one with the new VAPID key.
     * 3) If the database cache is invalidated: Send a request to FCM to update
     * the token, and to check if the token is still valid on FCM-side.
     */
    private manageExistingToken(swReg, pushSubscription, publicVapidKey, tokenDetails);
    private isTokenStillValid(pushSubscription, publicVapidKey, tokenDetails);
    private updateToken(swReg, pushSubscription, publicVapidKey, tokenDetails);
    private getNewToken(swReg, pushSubscription, publicVapidKey);
    /**
     * This method deletes tokens that the token manager looks after,
     * unsubscribes the token from FCM  and then unregisters the push
     * subscription if it exists. It returns a promise that indicates
     * whether or not the unsubscribe request was processed successfully.
     * @export
     */
    deleteToken(token: string): Promise<Boolean>;
    getSWRegistration_(): Promise<ServiceWorkerRegistration>;
    getPublicVapidKey_(): Promise<Uint8Array>;
    requestPermission(): void;
    /**
     * Gets a PushSubscription for the current user.
     */
    getPushSubscription(swRegistration: ServiceWorkerRegistration, publicVapidKey: Uint8Array): Promise<PushSubscription>;
    /**
     * @export
     * @param {!ServiceWorkerRegistration} registration
     */
    useServiceWorker(registration: any): void;
    /**
     * @export
     * @param {!string} b64PublicKey
     */
    usePublicVapidKey(b64PublicKey: any): void;
    /**
     * @export
     * @param {!firebase.Observer|function(*)} nextOrObserver
     * @param {function(!Error)=} optError
     * @param {function()=} optCompleted
     * @return {!function()}
     */
    onMessage(nextOrObserver: any, optError: any, optCompleted: any): void;
    /**
     * @export
     * @param {!firebase.Observer|function()} nextOrObserver An observer object
     * or a function triggered on token refresh.
     * @param {function(!Error)=} optError Optional A function
     * triggered on token refresh error.
     * @param {function()=} optCompleted Optional function triggered when the
     * observer is removed.
     * @return {!function()} The unsubscribe function for the observer.
     */
    onTokenRefresh(nextOrObserver: any, optError: any, optCompleted: any): void;
    /**
     * @export
     * @param {function(Object)} callback
     */
    setBackgroundMessageHandler(callback: any): void;
    /**
     * This method is required to adhere to the Firebase interface.
     * It closes any currently open indexdb database connections.
     */
    delete(): Promise<[void, void]>;
    /**
     * Returns the current Notification Permission state.
     * @private
     * @return {string} The currenct permission state.
     */
    getNotificationPermission_(): any;
    getTokenDetailsModel(): TokenDetailsModel;
    getVapidDetailsModel(): VapidDetailsModel;
    /**
     * @protected
     * @returns {IIDModel}
     */
    getIIDModel(): IIDModel;
}
