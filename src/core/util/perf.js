// 这个文件是性能判断
import { inBrowser } from './env' // 运行环境window是否存在

export let mark
export let measure
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/performance
// 性能
// mark 创建标记，没有返回值（自己的理解 ）该方法一般用来多次记录时间，用于求得各记录间的时间差
if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      perf.clearMeasures(name)
    }
  }
}
