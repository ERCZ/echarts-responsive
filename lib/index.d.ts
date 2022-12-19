import * as echart from 'echarts';

declare type objType = {
    [index: string]: unknown;
};
declare class ResponsiveECharts {
    static minFontSize: number;
    static baseFontSize: number;
    static minLineSize: number;
    static baseLineSize: number;
    static baseWidth: number;
    static resizeAnimation: {
        duration: number;
    };
    private chart;
    private option;
    constructor(chart: echart.ECharts);
    private resize;
    setOption(option: objType, ...rest: unknown[]): void;
    dispose(): void;
    private transformOption;
    private transformRem;
}

export { ResponsiveECharts as default };
