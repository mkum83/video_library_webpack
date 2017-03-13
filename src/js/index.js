import $ from 'jquery';

import Model from './model.js'
import Controller from './controller.js'
import View from './view.js'
import '../less/style.less'

/* start the app */
$(document).ready(function(){
    console.log('starting');
    let model = new Model(),
         controller = new Controller(model),
        view,
        $root = $("#app");
    
    
        view = new View({            
            template:$("#template"),
            loading:$root.find(".js-loading"),
            entries:$root.find(".js-Entries"),
            playerDiv:$root.find(".js-playerDiv"),
            history:$root.find(".js-history"),
            historyTemplate:$("#history_template")
        },controller);
    
})