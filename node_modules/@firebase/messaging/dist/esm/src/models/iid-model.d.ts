export default class IIDModel {
    private errorFactory_;
    constructor();
    /**
     * Given a PushSubscription and messagingSenderId, get an FCM token.
     * @public
     * @param  {string} senderId The 'messagingSenderId' to tie the token to.
     * @param  {PushSubscription} subscription The PushSusbcription to "federate".
     * @param  {Uint8Array} publicVapidKey The public VAPID key.
     * @return {Promise<!Object>} Returns the FCM token to be used in place
     * of the PushSubscription.
     */
    getToken(senderId: any, subscription: any, publicVapidKey: any): Promise<Object>;
    /**
     * Update the underlying token details for fcmToken.
     */
    updateToken(senderId: string, fcmToken: string, fcmPushSet: string, subscription: PushSubscription, publicVapidKey: Uint8Array): Promise<string>;
    /**
     * Given a fcmToken, pushSet and messagingSenderId, delete an FCM token.
     */
    deleteToken(senderId: string, fcmToken: string, fcmPushSet: string): Promise<void>;
}
