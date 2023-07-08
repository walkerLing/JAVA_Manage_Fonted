import SvgIcon from '@/components/SvgIcon'

const svgRequired = require.context('./svg', false, /\.svg$/)
svgRequired.keys().forEach((item) => svgRequired(item))

export default (app) => {
  // 挂载全局组件，作为全局组件使用
  app.component('svg-icon', SvgIcon)
}
