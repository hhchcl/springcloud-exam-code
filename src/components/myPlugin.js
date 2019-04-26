import Vue from 'vue'
import header from './header/src/header' //页头
import content from './content/src/content' //内容
import footer from './footer/src/footer' //页脚
import rightTools from './right-tools/src/right-tools' //右边工具栏
import progressBar from './progress-bar/src/progress-bar' //进度条

const components = [
    content,
    footer,
    header,
    rightTools,
    progressBar,
]

let install = (Vue) => {
    components.map(component => {
        let componentName = "hc-" + component.name
        Vue.component(componentName, component);
    })
}
install(Vue)