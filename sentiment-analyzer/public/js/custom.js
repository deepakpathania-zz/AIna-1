var canvas = document.getElementById('updating-chart'),
  ctx = canvas.getContext('2d'),
  startingData = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
        {
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
  },
  latestLabel = startingData.labels[6];
var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
$('#myForm').submit(function () {
  var x = document.getElementById("myForm");
  myLiveChart.addData([x.elements[0].value, x.elements[1].value], x.elements[2].value);
  myLiveChart.removeData();
  myForm.reset();
  return false;
});
