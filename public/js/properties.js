(function(exports){

    const API_VERSION = 0;

    exports.config = {
        currentStatus: 'loading',
        defaultTimeout: 5000,
        errorMessage: 'Could not get this monitoring variable!',
        millisecondsUpdateTime: 10000,
        apiVersion: API_VERSION,
        statusMonitoringMethodsUrl: "api/" + API_VERSION + '/status-monitoring-methods',
        monitoringVariables: {
            cpu: {
                id: "cpuCore",
                url: "api/" + API_VERSION + "/cpu",
                label: "CPU Usage",
                currentStatus: 'loading',
                status: function(value) {
                    if (value < 70) return "stable";
                    else if (value < 90) return "unstable";
                    else return "dangerous";
                },
                chartLabels: [],
                chartDataIndexes: [0],
                getDataAppropriately: function(json) {
                    return json[0];
                },
                value: function(values){
                    return values[0];
                },
                formatedValue: function(values){
                    return values[0] + "%";
                },
                totalNumberMonitoring: 600,
                chart: undefined,
                chartType: 'pie'
            },
            requests: {
                id: "concurrentRequests",
                url: "api/" + API_VERSION + "/requests",
                label: "Concurrent Requests",
                currentStatus: 'loading',
                status: function(value) {
                    if (value < 1000) return "stable";
                    else if (value < 3000) return "unstable";
                    else return "dangerous";
                },
                chartLabels: ['-30s','-20s','-10s','now'],
                chartDataIndexes: [180,120,60,0],
                getDataAppropriately: function(json) {
                    return [ json ];
                },
                value: function(values){
                    return values[0][3];
                },
                formatedValue: function(values){
                    return values[0][3];
                },
                totalNumberMonitoring: 720,
                chart: undefined,
                chartType: 'line'
            }
        }
    };

})(typeof exports === 'undefined'? this['properties']={}: exports);