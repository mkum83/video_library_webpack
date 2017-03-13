import $ from 'jquery';
/* controller to fetch the data */
class Controller {
    constructor(model) {
        this.model = model;
        this.init();
    }
    init() {
        //send call to fetch the entries...
        let url = "https://demo2697834.mockable.io/movies";
        //url="/data.json";
        $.ajax({
            url: url,
            data: {},
            success: (function (data) {
                //console.dir(data);
                //store entries in the model
                this.model.loadStore(data);
            }).bind(this),
            dataType: "json"
        });
    }
    /* to fetch record */
     getEntry(id) {
        return this.model.getEntry(id);
    }

}
export default Controller;
