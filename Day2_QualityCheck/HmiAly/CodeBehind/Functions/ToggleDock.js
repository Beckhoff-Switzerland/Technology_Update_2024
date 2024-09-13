// Provider for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var AnalyticsHMIProject;
        (function (AnalyticsHMIProject) {
            function ToggleDock() {
                $('#TcHmiDynamicContainer').toggleClass('dynamic-container-dest-transition');
                $('#HideButton').toggleClass('hide-btn-dest-transition');

                // negate internal variable dockExpanded
                var dockExpanded = TcHmi.Symbol.read('dockExpanded', TcHmi.SymbolType.Internal);
                TcHmi.Symbol.write('dockExpanded', TcHmi.SymbolType.Server, !dockExpanded, function (data) { });
            }
            AnalyticsHMIProject.ToggleDock = ToggleDock;
        })(AnalyticsHMIProject = Functions.AnalyticsHMIProject || (Functions.AnalyticsHMIProject = {}));
        Functions.registerFunctionEx('ToggleDock', 'TcHmi.Functions.AnalyticsHMIProject', AnalyticsHMIProject.ToggleDock);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);