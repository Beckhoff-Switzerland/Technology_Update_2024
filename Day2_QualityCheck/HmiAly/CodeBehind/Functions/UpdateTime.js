// Provider for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

(function (TcHmi) {

    var CurrentTime = function (TimerControl) {

        if (!TimerControl)
            return;

        if (TimerControl.getType() !== "TcHmi.Controls.Analytics.Timer")
            return;

        var data = TimerControl.__dateTime;

        let newDate = new Date();

        let timer;

        function updateClock() {
            newDate = new Date();
            var newData = data;
            newData.wYear = newDate.getFullYear();
            newData.wMonth = newDate.getMonth() + 1;
            newData.wDay = newDate.getDate();
            newData.wDayOfWeek = newDate.getDay();
            newData.wHour = newDate.getHours();
            newData.wMinute = newDate.getMinutes();
            newData.wSecond = newDate.getSeconds();
            newData.wMilliseconds = 0;
            newData.wNanoseconds = 0;

            TimerControl.setTimeType("Timespan");
            TimerControl.setDateTime(newData);
            TimerControl.setTimeType("Datetime");
        }

        timer = setInterval(updateClock, 1000);

    };

    TcHmi.Functions.registerFunction('UpdateTime', CurrentTime);
})(TcHmi);