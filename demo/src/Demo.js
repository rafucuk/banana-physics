var MatterTools = require('./matter-tools');

var demo = function(examples, isDev) {
    var demo = MatterTools.Demo.create({
        toolbar: {
            title: 'banana' + (isDev ? ' ・ dev' : ''),
            url: '/',
            reset: true,
            source: false,
            inspector: true,
            tools: true,
            fullscreen: true,
            exampleSelect: true
        },
        tools: {
            inspector: true,
            gui: true
        },
        inline: false,
        preventZoom: true,
        resetOnOrientation: true,
        routing: true,
        startExample: 'mixed',
        examples: examples
    });

    window.MatterDemoInstance = demo;

    document.body.appendChild(demo.dom.root);
    document.title = 'Banana Physics' + (isDev ? ' ・ Dev' : '');

    if (isDev) {
        // always show debug info
        Matter.before('Render.create', function(renderOptions) {
            renderOptions.options.showDebug = true;
            renderOptions.options.wireframeBackground = "#101010";
            renderOptions.options.background = "#101010";
        });

        // arrow key navigation of examples
        document.addEventListener('keyup', function(event) {
            var isBackKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp',
                isForwardKey = event.key === 'ArrowRight' || event.key === 'ArrowDown';

            if (isBackKey || isForwardKey) {
                var direction = isBackKey ? -1 : 1,
                    currentExampleIndex = demo.examples.findIndex(function(example) { 
                        return example.id === demo.example.id;
                    }),
                    nextExample = demo.examples[(demo.examples.length + currentExampleIndex + direction) % demo.examples.length];
                
                MatterTools.Demo.setExample(demo, nextExample);
            }
        });
    }

    MatterTools.Demo.start(demo);
};

module.exports = { demo: demo };
