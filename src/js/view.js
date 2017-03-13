import $ from 'jquery';
import Player from './player.js';
import Movies from './movies.js';
import Cookie from './cookie.js';
let movieListingTemplate = require("../handlebars/movies.handlebars");
let historyListingTemplate = require("../handlebars/history.handlebars");

/* handle view */
class View {
    constructor($domElements,controller) {
        //store all the dom info needed
        this.$dom = {
                $loading: $domElements.loading
            }
            //store controller
        this.controller = controller;
        //init movies
        this.movies = new Movies({
            $div: $domElements.entries,
            template: movieListingTemplate
        });
        //init movies
        this.history = new Movies({
            $div: $domElements.history,
            template: historyListingTemplate
        });
        //make a player 
        this.player = new Player({
            playerDiv: $domElements.playerDiv,
            autoplay: false
        });
        this.cookies = new Cookie();// Cookie.getInstance();
        this.state = {
            previous: "",
            current: "",
            historyList: "#"
        }
        this.init();
    } 

     init() {
        //bind read hash here...if item
        $(window).on('hashchange', (function () {
            this.readHash();
        }).bind(this));

        $(document).on("LOADMOVIES", (function (event, entries) {
            //load all the entries on the screen
            this.loadMovies(entries);
            //check the deep linking
            $(window).trigger("hashchange");
        }).bind(this));
        this.player.on("ONEND", (function () {
            //remove hash..it will call hash change and hide the video player
            window.location.hash = this.state.previous || "";
        }).bind(this));
        this.player.on("ONCLOSE", (function () {
            //remove hash..it will call hash change and hide the video player
            window.location.hash = this.state.previous || "";
        }).bind(this))

    }

     setState(current) {
        //if (this.state.current) {
        this.state.previous = (this.state.current.toUpperCase() == "HISTORY") ? this.state.current : "";
        //}
        this.state.current = current;
    }

     readHash() {
        let hash = location.hash;
        hash = hash.replace(/^#/, "") || "";
        this.setState(hash);

        switch (hash.toUpperCase()) {
            case "HISTORY":
                this.showHistory();
                break;
            case "":
                this.showMovies();
                break;
            default:
                this.playEntry(hash);
                break;
        }

    }

     playEntry(entryID) {
        let _item = this.controller.getEntry(entryID);
        if (!_item) {
            //this.$dom.$playerDiv.hide();
            this.player.hide(true)
            return;
        }
        this.player.load(_item.contents);
        this.player.show(true);
        //add in cookie
        this.cookies.add("MOVIES", entryID, "|", 365);
    }

     hide(object) {
        object && object.hide();
    }

     loadMovies(entries) {
        this.movies.load(entries, true);
    }

     showMovies(entries) {
        this.hide(this.$dom.$loading);
        this.hide(this.history);
        this.player.hide(true)
        this.movies.show();
        this.movies.focus("a:first");
    }

     showHistory() {
        //get entries from cookies.
        let cookie = this.cookies.get("MOVIES"),
            movies,
            historyList = [];

        //hide others
        this.hide(this.$dom.$loading);
        this.hide(this.movies);
        this.hide(this.player);

        //load history if new list found
        if (this.state.historyList != cookie) {

            movies = cookie.split("|");
            movies.map((function (key) {
                let movie = this.controller.getEntry(key);
                movie && historyList.push(movie);
            }), this);
            this.history.load({
                "entries": historyList
            }, true, historyList.length);
        }
        this.state.historyList = cookie;
        this.history.show();
        this.history.focus("a:first");
    }
}
export default View;