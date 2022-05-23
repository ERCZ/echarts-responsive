## 示例

```javascript
import * as echarts from 'echarts'
import ResponsiveECharts from 'echarts-responsive'

const echartInstance = echarts.init(document.getElementById('chart'))
const chart = new ResponsiveECharts(echartInstance)
chart.setOption({
  title: {
    text: 'hello',
    textStyle: {
      fontSize: '3rem',
    },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLabel: {
      fontSize: '1rem',
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
})
```

## 构造函数

### ResponsiveECharts(chart)

chart - echarts实例，即echarts.init方法的返回值

## 静态变量

### ResponsiveECharts.baseWidth

number，项目基准宽度，默认1920

### ResponsiveECharts.basePx

number，项目基准字体大小，默认12

### ResponsiveECharts.minPx

number，最小字体大小，默认12

### ResponsiveECharts.resizeAnimation

object，图表大小变化时的动画控制，参考[echarts实例的resize方法参数的opts.animation](https://echarts.apache.org/zh/api.html#echartsInstance.resize)，默认`{ duration: 2 }`

## 实例方法

### instance.setOption

同echarts实例的setOption方法，但会对option中的rem单位做处理

### instance.dispose

同echarts实例的dispose方法，但会做一些额外的必要处理