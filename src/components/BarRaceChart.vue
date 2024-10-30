<template>
  <v-card class="mx-auto" max-width="1200">
    <v-card-title>Volume of Traffic per Airline</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <div id="bar-race-chart" ref="chart" style="height: 400px;"></div>
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
    this.startUpdatingData();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: '#333', // Dark background for better contrast
          textStyle: {
            color: '#fff' // White text for better readability
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#e2e8f0'
          }
        },
        yAxis: {
          type: 'category',
          data: ['AA', 'BA', 'CA', 'DA', 'EA'], // Updated to airlines
          axisLabel: {
            color: '#e2e8f0'
          },
          name: 'Airline',
          nameTextStyle: {
            color: '#fff' // White color for label
          }
        },
        series: [
          {
            name: 'Airlines',
            type: 'bar',
            data: [320, 240, 180, 150, 130],
            itemStyle: {
              color: function(params) {
                const colorMap = {
                  'AA': '#5470C6',
                  'BA': '#91CC75',
                  'CA': '#FAC858',
                  'DA': '#EE6666',
                  'EA': '#73C0DE'
                };
                return colorMap[params.name];
              }
            }
          }
        ]
      };
      this.chart.setOption(this.options);
    },
    startUpdatingData() {
      setInterval(() => {
        this.updateData();
      }, 3000);
    },
    updateData() {
      const newData = this.options.series[0].data.map((value, index) => ({
        value: value + Math.floor(Math.random() * 50),
        category: this.options.yAxis.data[index]
      }));

      newData.sort((a, b) => b.value - a.value).reverse(); // Reverse the sorted data

      this.options.series[0].data = newData.map(item => item.value);
      this.options.yAxis.data = newData.map(item => item.category);

      this.chart.setOption(this.options);
    }
  }
};
</script>