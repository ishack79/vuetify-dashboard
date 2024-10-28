<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Flight Plan Traffic Volume Heatmap</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="heatmap-chart" ref="chart" style="height: 400px;"></div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
      const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

      const data = [];
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
          let value;
          if (j >= 6 && j <= 12) {
            value = Math.floor(Math.random() * 100) + 50; // More traffic in the morning
          } else if (j >= 0 && j < 6 || j > 12 && j < 18) {
            value = Math.floor(Math.random() * 50) + 20; // Moderate traffic during the day
          } else {
            value = Math.floor(Math.random() * 20); // Less traffic at night
          }
          if (i === 0 || i === 6) {
            value += 30; // More traffic on weekends
          }
          data.push([j, i, value]);
        }
      }

      const options = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 200,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [{
          name: 'Flight Plan Traffic Volume',
          type: 'heatmap',
          data: data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };

      chart.setOption(options);
    }
  }
};
</script>