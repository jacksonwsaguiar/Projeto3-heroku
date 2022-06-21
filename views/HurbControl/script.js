var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.height === "100px") {
      panel.style.height = "0px";
    } else {
      panel.style.height = "100px";
    }
  });
}
function getData() {
  $.ajax({
    url: "/hurb-analytics",
    type: "GET",
    success: (data) => {
      console.log(data);
      // for (let index = 0; index < 3; index++) {
      document.getElementById("data-items").innerHTML += generateCard(
        data.D2,
        "D2"
      );
      document.getElementById("data-items").innerHTML += generateCard(
        data.D7,
        "D7"
      );
      document.getElementById("data-items").innerHTML += generateCard(
        data.D15,
        "D15"
      );
      // }

      const total =
        data.D2.totalOrders + data.D7.totalOrders + data.D15.totalOrders;

      const percent = 100 / total;

      createChart("HurbChartD2", data.D2.totalOrders * percent);
      createChart("HurbChartD7", data.D7.totalOrders * percent);
      createChart("HurbChartD15", data.D15.totalOrders * percent);
    },
  });
}
//chart

function getConfig(value, ctx) {
  var dataInfo = {
    labels: [],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#3468FC"],
      },
    ],
  };

  var chartOptions = {
    rotation: -Math.PI,
    cutoutPercentage: 60,
    circumference: Math.PI,

    animation: {
      animateRotate: true,
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      var width = chart.chart.width,
        height = chart.chart.height;

      ctx.restore();
      var fontSize = (height / 70).toFixed(2);
      ctx.font = fontSize + "em Montserrat";
      ctx.textBaseline = "middle";
      ctx.textColor = "#000";

      var text = value + " %",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height - 12;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  });

  return {
    type: "doughnut",
    data: dataInfo,
    options: chartOptions,
  };
}

function createChart(chartId, value) {
  var ctx = document.getElementById(chartId).getContext("2d");
  var customConfig = getConfig(value, ctx);
  new Chart(ctx, customConfig);
}

function generateCard(data, type) {
  data.rank.sort((a, b) => {
    if (a.capacity > b.capacity) return -1;
    if (a.capacity < b.capacity) return 1;
    return 0;
  });

  const sum =
    parseFloat(data.averages.currentMonth) +
    parseFloat(data.averages.lastMonth);
  const media = sum / 2;

  let paymentsHTML = "";
  let rankingHTML = "";

  for (let index = 1; index < data.payments.length; index++) {
    const element = data.payments[index];

    paymentsHTML += `
  <tr>
  <td><div class="badge"></div></td>
  <td>${element.date}</td>
  <td>R$ ${element.value}</td>
</tr>
  `;
  }
  for (let index = 0; index < data.rank.length; index++) {
    const element = data.rank[index];

    rankingHTML += `
  <div class="card-ranking">
    <div>
      <span>${index + 1}º</span>
      <span>${element.name}</span>
    </div>
    <div class="right-side">
      <span>${element.capacity} solicitações</span>
      <span>R$ ${element.budget}</span>
    </div>
  </div>
  `;
  }

  return `
  
  <div class="card">
  <div class="top">
    <h2>${type}</h2>
    <h2>${data.totalOrders}</h2>
  </div>
  <div class="info">
    <h4>Ultimos meses</h4>
    <div class="content">
      <div>
        <label for="">Atualmente</label>
        <h2>R$ ${data.averages.currentMonth}</h2>
      </div>
      <div>
        <label for="">Ultimo mês</label>
        <h2>R$ ${data.averages.lastMonth}</h2>
      </div>
      <div>
        <label for="">Média</label>
        <h2>R$ ${media}</h2>
      </div>
      <div>
        <label for="">Média Anual</label>
        <h2>R$ ${sum}</h2>
      </div>
    </div>
  </div>
  <div class="data">
    <h4>Proximos pagamentos</h4>
    <div class="content-payments">
      <div class="highlight">
        <h3> ${data.payments[0].date}</h3>
        <h2>R$ ${data.payments[0].value}</h2>
      </div>
      <div class="list">
        <table>
        ${paymentsHTML}
         
        </table>
      </div>
    </div>
    <h4>Ranking</h4>
   ${rankingHTML}
  </div>
  <div class="bottom">
    <div>
      <canvas id="HurbChart${type}" width="150" height="60"></canvas>
    </div>
    <div>
      <h4>Rentabilidade</h4>
      <h2>R$ ${data.totalValue}</h2>
    </div>
  </div>
</div>
  `;
}
