import F2 from '@antv/my-f2';
// import F2 from '@antv/my-f2/lib/core'; // 必须引入
// require('@antv/f2/lib/geom/line'); // 只引入折线图
// require('@antv/f2/lib/geom/area'); // 只引入面积图
// require('@antv/f2/lib/scale/time-cat'); // 时间类型的度量
// const Tooltip = require('@antv/f2/lib/plugin/tooltip'); // 引入 tooltip 插件
const app = getApp();
let chart = null;
function drawChart(canvas, width, height) {
  const data = [
    { value: 63.4, city: 'New York', date: '2011-10-01' },
    { value: 62.7, city: 'Alaska', date: '2011-10-01' },
    { value: 72.2, city: 'Austin', date: '2011-10-01' },
    { value: 58, city: 'New York', date: '2011-10-02' },
    { value: 59.9, city: 'Alaska', date: '2011-10-02' },
    { value: 67.7, city: 'Austin', date: '2011-10-02' },
    { value: 53.3, city: 'New York', date: '2011-10-03' },
    { value: 59.1, city: 'Alaska', date: '2011-10-03' },
    { value: 69.4, city: 'Austin', date: '2011-10-03' }
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height,
    // plugins: Tooltip // 注册 tooltip 插件
  });
  chart.source(data, {
    date: {
      range: [0, 1],
      type: 'timeCat',
      mask: 'YYYY-MM-DD'
    },
    value: {
      max: 300,
      tickCount: 4
    }
  });
  chart.axis('date', {
    label(text, index, total) {
      const textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      }
      if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.area().position('date*value').color('city').adjust('stack');
  chart.line().position('date*value').color('city').adjust('stack');
  chart.render();
  return chart;
}
Page({
  data: {},
  onLoad() {
  },
  onReady() {
    dd.createSelectorQuery()
      .select('#myChart')
      .boundingClientRect()
      .exec((res) => {
        // 获取分辨率
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 获取画布实际宽高
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;
        // 高清解决方案
        this.setData({
          width: canvasWidth * pixelRatio,
          height: canvasHeight * pixelRatio
        });
        const myCtx = my.createCanvasContext('myChart');
        myCtx.scale(pixelRatio, pixelRatio); // 必要！按照设置的分辨率进行放大
        const canvas = new F2.Renderer(myCtx);
        this.canvas = canvas;
        //console.log(res[0].width, res[0].height);
        drawChart(canvas, res[0].width, res[0].height);
      });
  },
  touchStart(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchstart', [e]);
    }
  },
  touchMove(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchmove', [e]);
    }
  },
  touchEnd(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchend', [e]);
    }
  }
});
