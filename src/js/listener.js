/* subscribe/listener */
class Listener{
    constructor(){
        this._Listeners = {};
    }
    on(key, callback) {
        this._Listeners[key] = this._Listeners[key] || [];
        this._Listeners[key].push(callback);
    }
    trigger(key) {
        this._Listeners[key] && this._Listeners[key].map(function (callback) {
            callback.call();
        })
    }
}
export default Listener;
