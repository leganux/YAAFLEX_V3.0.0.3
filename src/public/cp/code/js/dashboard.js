$(document).ready(function () {


    var CallServer = function () {


        $.getJSON(rootPath + '/api/server_statistics', {}, function (data) {
            if (data.success) {
                $('#TotalMemory').text(data.data.totalmem.toFixed(2) + 'MB');
                $('#FreeMemory').text(data.data.freemen.toFixed(2) + 'MB');
                $('#Uptime').text(data.data.uptime.toFixed(2) + 'HR');
                $('#freeDisk').text(data.data.freeDiskSpace.toFixed(2) + 'GB');
                $('#TotalDisk').text(data.data.totalDiskSpace.toFixed(2) + 'GB');
                $('#JSONCPUS').val(JSON.stringify(data.data.cpus));
                $('#hereishourserver').text(data.data.hora);

            }
        });
    }
    CallServer();
    setInterval(() => {
        CallServer();
    }, 10000);
});