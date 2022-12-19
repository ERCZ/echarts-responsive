import * as echart from 'echarts'
import { cloneDeep } from 'lodash-es'

type objType = { [index: string]: unknown }

export default class ResponsiveECharts {
    static minFontSize = 12
    static baseFontSize = 12
    static minLineSize = 1
    static baseLineSize = 1
    static baseWidth = 1920
    static resizeAnimation = { duration: 2 }
    private chart: echart.ECharts
    private option = {}

    constructor(chart: echart.ECharts) {
        this.chart = chart
        window.addEventListener('resize', this.resize)
    }

    private resize = () => {
        this.chart.resize({
            animation: ResponsiveECharts.resizeAnimation
        })
        this.chart.setOption(this.transformOption(this.option))
    }

    setOption(option: objType, ...rest: unknown[]) {
        this.option = Object.assign(this.option, option)
        // @ts-ignore
        this.chart.setOption(this.transformOption(option), ...rest)
    }

    dispose() {
        window.removeEventListener('resize', this.resize)
        this.chart.dispose()
    }

    private transformOption(option: { [index: string]: unknown }) {
        option = cloneDeep(option)
        if (typeof option !== 'object') return option
        for (let key in option) {
            if (typeof option[key] === 'string') {
                option[key] = this.transformRem(option[key] as string)
            } else if (typeof option[key] === 'object') {
                if (option[key] instanceof Array) {
                    option[key] = (option[key] as objType[]).map(o => this.transformOption(o))
                } else {
                    option[key] = this.transformOption(option[key] as objType)
                }
            }
        }
        return option
    }

    private transformRem(str: string) {
        const result = /^\d+(.\d+)?(rfs|rls)$/.exec(str)
        if (!result) return str
        if (result[2] === 'rfs') {
            const i = parseFloat(str) * ResponsiveECharts.baseFontSize * document.body.clientWidth / ResponsiveECharts.baseWidth
            return i < ResponsiveECharts.minFontSize ? ResponsiveECharts.minFontSize : i
        } else {
            const i = parseFloat(str) * ResponsiveECharts.baseLineSize * document.body.clientWidth / ResponsiveECharts.baseWidth
            return i < ResponsiveECharts.minLineSize ? ResponsiveECharts.minLineSize : i
        }
    }
}