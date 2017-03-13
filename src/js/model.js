import $ from 'jquery';
/* store */
class Model {
    construtor() {
        this.store={};
    }
/* load store */
    loadStore(data) {
        this.store = data;
        //call the subscribers
        $(document).trigger("LOADMOVIES", this.store);
    }
/* get record*/
    getEntry(id) {
        let _item;

        if (!id || !this.store || !this.store.entries) {
            return _item;
        }
        _item = this.store.entries.find(function (item) {
            if (item.id === id)
                return true;
        })
        return _item;
    }
}

export default Model;
