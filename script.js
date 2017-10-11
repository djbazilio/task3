angular.module('myModule', [])
    .directive('myTable', function () {
        return {
            template: '<div><span ng-repeat="i in tables"><button ng-click="setTable($index,i)">Table {{$index+1}}</button></span>' +
            '<table ng-if="data"><tr ng-repeat="c in data"><td>x{{c[0]}}</td><td>y{{c[1]}}</td></tr></table></div>' +
            '<div ng-if="data"><hc-chart title="{{title}}" data="data"></hc-chart></div>',
            link: function(scope) {
                scope.setTable= function(t,i) {
                    scope.title = 'table' + (t+1);
                    scope.data = i;
                }
            }
        }
    })
    .directive('hcChart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                title: '@',
                data: '='
            },
            link: function (scope, element) {
                scope.$watch('title', function(){
                    Highcharts.chart(element[0], {
                        chart: {
                            type: scope.title=='table2'? 'column' : ''
                        },
                        title: {
                            text: scope.title
                        },

                        series: [{
                            data: scope.data,
                            lineWidth: 0,
                            marker: {
                                enabled: true,
                                radius: 2
                            },
                            tooltip: {
                                valueDecimals: 2
                            },
                            states: {
                                hover: {
                                    lineWidthPlus: 0
                                }
                            }
                        }]
                    });
                });
            }
        };
    })
    .controller('myController', function ($scope) {
        var tables = {
            1       : [],
            2       : []
        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function getDot(from,step){
            var arr = [];
            while(arr.length<5){
                var n = getRandomInt(from,11);
                var c = false;
                for(var i in arr){
                    if(arr[i]==n){
                        c = true;
                    }
                }
                if(!c) {
                    if(n%step==0) {
                        arr.push(n)
                    }
                }
            }
            return arr;
        }
        for(var i in tables){
            i = parseInt(i);
            var x = getDot(i,i);
            var y = getDot(i,1);
            for(var j in x){
                tables[i].push([x[j], y[j]])
            }
        }
        $scope.tables = tables;
    });