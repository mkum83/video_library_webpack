import $ from 'jquery';
import Listener from './listener.js'

/* video player */
class Player extends Listener {
    constructor(options) {
        super();
        this.$root = options.playerDiv;
        this.autoplay = options.autoplay || false;

        this.init();
    }
    init() {
        //find the controls
        this.video = this.$root.find("video")[0];
        this.video.autoplay = this.autoplay;

        this.$play = this.$root.find(".js-play");
        this.$close = this.$root.find(".js-close");
        //bind event to each node
        this.$play.on("click", this.play);
        this.$close.on("click", (function () {
            this.pause();
            this.trigger("ONCLOSE");
        }).bind(this));
        this.video.onended = (function () {
            this.trigger("ONEND");
        }).bind(this);

    }

    show(play) {
        this.$root.show();
        play && this.play();
    }

    hide() {
        this.$root.hide();
        this.stop()
    }

    play() {
        this.video.play();
    }

    pause() {
        this.video.pause();
    }

    stop() {
        this.video.pause();
        //this.trigger("ONSTOP");
    }

    load(src) {
        this.video.innerHTML = '';
        src.map((function (item) {
            var source = document.createElement('source');
            source.src = item.url;
            source.type = "video/" + item.format;
            this.video.appendChild(source);
        }).bind(this))

        this.video.autoplay = this.autoplay;
        
    }
}
export default Player;
