var database = [];
var basedata = [];
var basechart;
var piechartdata = [];
var total;
var death;

var deathlist = [];
function get_api() {
  //
  var base = fetch(
    "https://api.apify.com/v2/key-value-stores/fabbocwKrtxSDf96h/records/LATEST?disableRedirect=true"
  )
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("totalnumbers").innerHTML =
        data.infectedByRegion[0].infectedCount;
      document.getElementById("totaldeaths").innerHTML =
        data.infectedByRegion[0].deceasedCount;
      // console.log(data.infectedByRegion[0].infectedCount + "isCASES()");
      // console.log(data.infectedByRegion[0].deceasedCount + "isDeaths()");
      for (var i = 1; i < 14; i++) {
        database[i] = [data.infectedByRegion[i].region];
        basedata[i] = data.infectedByRegion[i].infectedCount;
        piechartdata[i] = data.infectedByRegion[i].region;
        deathlist[i] = data.infectedByRegion[i].deceasedCount;
        //console.log(database[i]);
      }
      //console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
get_api();

console.log(database, basedata);

function getchart(canvas) {
  console.log("drawing charts");
  var chart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: database,
      datasets: [
        {
          label: "By province",
          data: basedata,
          backgroundColor: [
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
            "rgba(123,123,12,4)",
            "rgba(123,0,132,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
            "rgba(123,123,12,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",

            "rgba(123,0,132,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
            "rgba(123,123,12,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
          ],
        },
      ],
    },
    option: {
      legend: {
        display: true,
        labels: {
          color: "rgb(233,33,45)s",
        },
      },
      scales: {
        x: {
          beginAtZero: false,
        },
      },
    },
  });
  // chart.destroy();
}

async function get_canvas(ctx) {
  var wait = await getchart(ctx);
  var awa = await clearContext(basechart);
  var num = await get3d_chart();
  var final = await get4d_chart();
  var textify = await getText();
  var text = await callcha();
  //console.log(ctx);
}
function clearContext(vas) {
  //return bubble.clearRect(0, 0, canvas.width, canvas.height);
}
function get3d_chart() {
  var matrix = document.getElementById("canvas2").getContext("2d");
  //console.log("successfully destroyed");
  var mychart = new Chart(matrix, {
    type: "line",
    data: {
      labels: database,
      datasets: [
        {
          label: "By provinces",
          data: basedata,
        },
      ],

      option: {},
    },
  });
}

function get4d_chart() {
  var dummychart = piechartdata;
  var dummysheet = basedata;
  dummysheet.shift();
  dummychart.shift();
  //console.log(dummychart, dummysheet);

  var matrix = document.getElementById("canvas3").getContext("2d");

  var mt = new Chart(matrix, {
    type: "polarArea",
    data: {
      labels: dummychart,
      datasets: [
        {
          label: "By province",
          data: dummysheet,
          backgroundColor: [
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
            "rgba(123,123,12,4)",
            "rgba(123,0,132,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
            "rgba(123,123,12,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",

            "rgba(123,0,132,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
            "rgba(123,123,12,4)",
            "rgba(123,45,12,4)",
            "rgba(23,145,12,4)",
          ],
        },
      ],
    },
    option: {},
  });

  mt.update();
}

function getText() {
  var n1 = document.getElementById("construct");
  var n2 = document.getElementById("chart2cont");
  var n3 = document.getElementById("chart3cont");
  n1.style.border = "1px solid black";
  n2.style.border = "1px solid black";
  n3.style.border = "1px solid black";
  var p1 = document.getElementById("p1");
  var p2 = document.getElementById("p2");
  var p3 = document.getElementById("p3");
  var p4 = document.getElementById("p4");

  p1.style.display = "inline";
  p2.style.display = "inline";
  p3.style.display = "inline";
  p4.style.display = "inline";
  // p1.innerHTML = "Bar Graph of cases";
  // p2.innerHTML = "Line Graph of cases";
  // p3.innerHTML = "Polar Graph of cases";
}

function callcha() {
  //console.log(piechartdata, deathlist, basedata);
  TableContents();
}

function TableContents() {
  var array = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ];
  //console.log(deathlist);
  deathlist.shift();
  for (var i = 0; i < 13; i++) {
    var temp = document.getElementById("tablerows" + array[i]);
    //console.log(temp);
    for (var j = 0; j < 3; j++) {
      var file = (document.getElementById("PROVINCE" + array[i]).innerHTML =
        piechartdata[i]);

      var infec = (document.getElementById("INCREASE" + array[i]).innerHTML =
        basedata[i]);
      var decease = (document.getElementById("DEATH" + array[i]).innerHTML =
        deathlist[i]);
    }
  }
}
