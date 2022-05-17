import { cloneDeep } from 'lodash';

class ResponsiveECharts {
    constructor(chart) {
        this.option = {};
        this.resize = () => {
            this.chart.resize({
                animation: ResponsiveECharts.resizeAnimation
            });
            this.chart.setOption(this.transformOption(this.option));
        };
        this.chart = chart;
        window.addEventListener('resize', this.resize);
    }
    setOption(option, ...rest) {
        this.option = Object.assign(this.option, option);
        // @ts-ignore
        this.chart.setOption(this.transformOption(option), ...rest);
    }
    dispose() {
        window.removeEventListener('resize', this.resize);
        this.chart.dispose();
    }
    transformOption(option) {
        option = cloneDeep(option);
        if (typeof option !== 'object')
            return option;
        for (let key in option) {
            if (typeof option[key] === 'string') {
                option[key] = this.transformRem(option[key]);
            }
            else if (typeof option[key] === 'object') {
                if (option[key] instanceof Array) {
                    option[key] = option[key].map(o => this.transformOption(o));
                }
                else {
                    option[key] = this.transformOption(option[key]);
                }
            }
        }
        return option;
    }
    transformRem(str) {
        if (!(/^\d+(.\d+)?rem$/.test(str)))
            return str;
        const i = parseFloat(str) * ResponsiveECharts.basePx * document.body.clientWidth / ResponsiveECharts.baseWidth;
        return i < ResponsiveECharts.minPx ? ResponsiveECharts.minPx : i;
    }
}
ResponsiveECharts.minPx = 12;
ResponsiveECharts.basePx = 12;
ResponsiveECharts.baseWidth = 1920;
ResponsiveECharts.resizeAnimation = { duration: 2 };

export { ResponsiveECharts as default };
//# sourceMappingURL=index.esm.js.map
