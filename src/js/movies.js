import $ from 'jquery';
/* movies list */
class Movies {
    constructor(options) {
        this.$root = options.$div;
        this.template =options.template; //Handlebars.compile(options.$template.html());
    }
    load(movies, clearFirst) {
        clearFirst && (this.$root.html(""));
        this.$root.append(this.template(movies));
    }

    show() {
        this.$root.show();
    }

    hide() {
        this.$root.hide();
    }

    focus(selector) {
        this.$root.find(selector).focus();
    }
}
export default Movies;
