// Provider for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        
        let region = TcHmi.Controls.get("TcHmiHostRegion");
        // Minimum touch duration
        let minDuration = 150;
        let minTravel = 100;
        var deltaTolerance = 100;

        let el = document.getElementById("TcHmiDynamicContainer");

        let startX = null;
        let startY = null;
        let starttime = null;
        el.ontouchstart = function (e) {
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;
            starttime = new Date().getTime();
        }

        el.ontouchend = function (e) {
            let tc = region.getTargetContent();
            if (tc == "Content/AdditionalInformation.content" || tc == "Content/Options.content" || tc == "Content/StartPage.content")
                return;

            var endX = e.changedTouches[0].pageX;
            var endY = e.changedTouches[0].pageY;
            var endtime = new Date().getTime();

            var duration = endtime - starttime;
            var distanceX = endX - startX;

            var delta = Math.abs(endY - startY);

            if (duration >= minDuration && Math.abs(distanceX) >= minTravel && delta <= deltaTolerance) {
                // 1 for dock left, -1 for dock right
                if (Math.sign(distanceX) == 1) {
                    // open dock
                    $('#TcHmiDynamicContainer').removeClass('dynamic-container-dest-transition');
                    $('#HideButton').removeClass('hide-btn-dest-transition');

                    TcHmi.Symbol.write('dockExpanded', TcHmi.SymbolType.Internal, true, function (data) {});
                } else {
                    // close dock
                    $('#TcHmiDynamicContainer').addClass('dynamic-container-dest-transition');
                    $('#HideButton').addClass('hide-btn-dest-transition');

                    TcHmi.Symbol.write('dockExpanded', TcHmi.SymbolType.Internal, false, function (data) {});
                }
            }
        }

           
    });
})(TcHmi);
