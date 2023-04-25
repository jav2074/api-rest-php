var app = angular.module('myApp', []);
// configure our routes
app.config(function ($httpProvider)
{
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $httpProvider.defaults.headers.get = {};
  $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
// controller
app.controller('myCtrl', function($scope, $http)
{
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // let urlFake_01 = "https://testamp2023.000webhostapp.com/amp.php";
    let urlFake_01 = "/php/amp.php";
    httpGet($http, urlFake_01, callBackFake_01);
    function callBackFake_01(result)
    {
        $scope.urlFake_01 = result;
        createGrid("wrapperAMP", $scope.urlFake_01, 10, true, true);
        
        var trueArray = Object.values(result).filter(user => user.like_ ==='true')
        var falseArray = Object.values(result).filter(user => user.like_ ==='false')
        var otherArray = Object.values(result).filter(user => user.like_ !='true' && user.like_ !='false')
        
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // AmCharts
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        am5.ready(function() {
        
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("chartdiv");
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
        am5themes_Animated.new(root)
        ]);
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
        }));
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
        }));
        
        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll([
            { value: trueArray.length, category: "True" },
            { value: falseArray.length, category: "False" },
            { value: otherArray.length, category: "Others" },
        ]);
        
        series.labels.template.setAll({
          // fontSize: 18,
          // text: "{category}\n{value}",
          // textType: "circular",
          // inside: true,
          // radius: 10,
          // fill: am5.color(0xffffff)
        });
        
        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        series.appear(1000, 100);
        
        // Add legend
        var legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: root.horizontalLayout
        }));
        
        legend.data.setAll(series.dataItems);
        
        }); // end am5.ready()
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  

});
