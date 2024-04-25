var Matter = require('matter-js');
var Examples = require('../../examples/index');
var demo = require('./Demo').demo;

// browser globals
window.pathseg = require('pathseg');
window.MatterTools = require('./matter-tools');
window.Matter = Matter;

// prepare examples
var examples = Matter.Common.keys(Examples).map(function(id){
    return {
        id: id,
        sourceLink: 'https://github.com/liabru/matter-js/blob/master/examples/' + id + '.js',
        name: Examples[id].title, 
        init: Examples[id]
    };
});

// start the requested tool
var isCompare = window.location.search.indexOf('compare') >= 0;
var isMulti = window.location.search.indexOf('multi') >= 0;
var isDev = __MATTER_IS_DEV__;

demo(examples, isDev);