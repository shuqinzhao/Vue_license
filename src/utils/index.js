import isomorphicFetch from 'isomorphic-fetch'
import docCookies from './docCookies'

// QBackup user info
export const BACKUP_USER_INFORMATION = {
  userId: 1,
  userName: 'admin',
  userPwd: 'admin',
  tokenKey: 'woqutech_qbackup',
  token: 'F6E929EF0ED57148C95F515D3AA7897E'
}
// QBackup module info
export const BACKUP_MODULE_INFORMATION = {
  QBackup: {
    count: 200,
    version: '3.1.0'
  }
}

// 下拉选项框常量
export const MEMORIES = [2, 4, 8] // 内存下拉选择范围
export const CPU_CORE = [1, 2, 4] // cpu 核数

// Database type
export const DB_TYPE_ORACLE = 1
export const DB_TYPE_MYSQL = 2
export const DB_TYPE_PG = 3

// state
export const STATE_SHUTDOWN = '0'
export const STATE_RUNNING = '1'
export const STATE_ERROR = '2'
export const STATE_PENDING = '3'
export const STATE_BACKUP = '4'
export const STATE = {}
STATE[STATE_SHUTDOWN] = 'Shutdown'
STATE[STATE_RUNNING] = 'Running'
STATE[STATE_ERROR] = 'Error'
STATE[STATE_PENDING] = 'Pending'
STATE[STATE_BACKUP] = 'Backup'

// os type
export const OS_TEMPLATE_TYPE_REDHAT = '1'
export const OS_TEMPLATE_TYPE = {}
OS_TEMPLATE_TYPE[OS_TEMPLATE_TYPE_REDHAT] = 'RedHat'

// db template type
export const DB_TEMPLATE_TYPE_ORACLE = '1'
export const DB_TEMPLATE_TYPE_MYSQL = '2'
export const DB_TEMPLATE_TYPE_PG = '3'
export const DB_TEMPLATE_TYPE = {}
DB_TEMPLATE_TYPE[DB_TEMPLATE_TYPE_ORACLE] = 'Oracle'
DB_TEMPLATE_TYPE[DB_TEMPLATE_TYPE_MYSQL] = 'MySQL'
DB_TEMPLATE_TYPE[DB_TEMPLATE_TYPE_PG] = 'PostgreSQL'

// MODULE 常量
export const MODULE_MONITOR = 'monitor'
export const MODULE_AIO = 'aio'
export const MODULE_BACKUP = 'backup'
export const MODULE_LICENSE = 'license'
export const MODULE = {}
MODULE[MODULE_MONITOR] = {
  key: 'QMonitor',
  name: 'QMonitor',
  apiprefix: '/akira'
}
MODULE[MODULE_AIO] = {
  key: 'QData',
  name: 'QData',
  apiprefix: '/sendoh'
}
MODULE[MODULE_BACKUP] = {
  key: 'QBackup',
  name: 'QBackup',
  apiprefix: '/everest'
}
MODULE[MODULE_LICENSE] = {
  key: 'QFusion',
  name: 'QFusion',
  apiprefix: '/api'
}

// storage object
export const STORAGE_OBJECT = sessionStorage // localStorage | sessionStorage
export const KEY_AUTH = `${MODULE_LICENSE}_auth` // BUGFIX(2016-12-05): cookie 相同端口 auth 信息串号

// 定制 fetch 方法
export const fetch = (key = '', api = '', request = {}) => {
  const auth = STORAGE_OBJECT.getItem(KEY_AUTH) ? JSON.parse(STORAGE_OBJECT.getItem(KEY_AUTH)) : STORAGE_OBJECT.getItem(KEY_AUTH)
  const url = [api]

  // mode 属性用来决定是否允许跨域请求，以及哪些 response 属性可读
  // same-origin: 同源策略，如果一个请求是跨院的，那么返回一个简单的 error
  // no-cors: default，允许来自CDN的脚本、其他域的图片和其他一些跨域资源，但是首先有个前提条件，就是请求的 method 只能是"HEAD"，"GET"或者"POST"
  // cors: 通常用作跨域请求来从第三方提供的API获取数据。这个模式遵守CORS协议。
  request.mode = request.mode || 'cors'

  request.headers = Object.assign({}, {
    'Accept': '*/*', // application/json, text/plain, */*
    'Content-Type': 'application/json charset=UTF-8' // 'application/x-www-form-urlencoded charset=UTF-8', multipart/form-data, application/json, text/plain
  }, request.headers)
  if (request.headers['Content-Type'] === 'multipart/form-data-import') {
    delete (request.headers['Content-Type'])
  }

  if (auth && auth.token) {
    Object.assign(request.headers, {
      'x-access-token': auth.token
    })
  }

  if (key !== '' && MODULE[key] && MODULE[key].apiprefix) {
    url.unshift(MODULE[key].apiprefix)
  }

  // === api 前后联调,正式发布需要注释该段代码 ===
  // url.unshift('http://192.168.1.137:8080')
  // === api 前后联调,正式发布需要注释该段代码 ===

  return isomorphicFetch(url.join(''), request)
}

// License 是否启用
export const isEnabled = () => {
  const module = STORAGE_OBJECT.getItem('module') ? JSON.parse(STORAGE_OBJECT.getItem('module')) : {}

  return Boolean(module.modules && module.modules.length)
}

// 用户是否登录
export const isLogined = () => {
  let auth = STORAGE_OBJECT.getItem(KEY_AUTH) ? JSON.parse(STORAGE_OBJECT.getItem(KEY_AUTH)) : {}

  // TODO: 2016-03-30 为了解决用户打开新页面需要重新登录的问题

  if ((Object.keys(auth).length === 0) && docCookies.hasItem(KEY_AUTH)) {
    auth = JSON.parse(docCookies.getItem(KEY_AUTH))

    // 同步 cookie 信息到 storage
    STORAGE_OBJECT.setItem(KEY_AUTH, JSON.stringify(auth))
  }

  return Boolean(auth.username && auth.token && auth.role !== undefined)
}

// 根据 module name 获取 module type
export const getModuleType = (moduleName) => {
  switch (moduleName) {
    case MODULE[MODULE_MONITOR].key:
      return MODULE_MONITOR
    case MODULE[MODULE_AIO].key:
      return MODULE_AIO
    case MODULE[MODULE_BACKUP].key:
      return MODULE_BACKUP
    case MODULE[MODULE_LICENSE].key:
      return MODULE_LICENSE
  }

  return ''
}

export const formatNumber = (number, decimal = 2, split = ',') => {
  if (!isNaN(parseFloat(number))) {
    number = Number(number).toFixed(decimal)

    if (typeof split !== 'string') {
      const parts = number.split('.')
      parts[0] = parts[0].toString().replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g, '' + split + '$1')

      return parts.join('.')
    } else {
      return number
    }
  }

  return number
}

// 获取选中 MODULE 的类型
export const getActiveModuleType = () => {
  const module = STORAGE_OBJECT.getItem('module') ? JSON.parse(STORAGE_OBJECT.getItem('module')) : {}

  return getModuleType(module.active)
}

// 正则对象
export const REGEXP_IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
export const REGEXP_PORT = /^[1-9]*[1-9][0-9]*$/
export const REGEXP_NUMBER = /^\d+$/
export const REGEXP_INTEGER = /^-?\d+$/
export const REGEXP_EMAIL = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
export const REGEXP_MOBILE = /^1[345678]\d{9}$/
export const REGEXP_NAME_ENGLISH = /^[a-zA-Z][a-zA-Z0-9_]*$/

// Highcharts base config
const chartFontFamily = 'Verdana'
const chartFontSize = '12px'
const chartFontWeight = 'normal'
const chartLineHeight = '18px'
const chartTitleFontSize = '14px'
const chartTitleLineHeight = '20px'
// export const HIGHCHARTS_BASE_CONFIG = {}
export const HIGHCHARTS_BASE_CONFIG = {
  global: {
    useUTC: false
  },
  colors: ['#56bc76', '#eac85e', '#32adfa', '#c596fa', '#70e0e0', '#a1e55c', '#f2a38d', '#ffe9a6', '#7aa9ff', '#e5603b', '#00b6d8', '#f78e2f', '#86BC3F', '#11c583', '#308999', '#7A5AA6', '#0873b9', '#2A5652', '#9B61A7', '#98CB65', '#F06C53', '#F0CA4D', '#00B9D9'],
  noData: {
    style: {
      fontSize: '15px',
      color: '#ccc'
    }
  },
  // 版权信息
  credits: {
    enabled: false
    // text: 'woqutech.com',
    // href: 'http://www.woqutech.com',
  },
  // 图标标题
  title: {
    text: null,
    align: 'center', // center | left | right
    // verticalAlign: 'top', // top | middle | bottom 注意: 设置水平对齐方式会使元素变为绝对定位,导致一些设置失效,eg:margin
    floating: false, // 标题是否浮动。当设置浮动（即该属性值为true）时，标题将不占空间。
    margin: 10, // 标题和图表区的间隔，当有副标题，表示标题和副标题之间的间隔
    style: {
      fontSize: chartTitleFontSize,
      lineHeight: chartTitleLineHeight
    }
  },
  // 图表副标题
  subtitle: {
    text: '',
    align: 'center'
  },
  // 关于图表区和图形区的参数及一般图表通用参数
  chart: {
    // margin: [0, 0, 40, 0],
    // marginBottom: 40,
    panning: true, // 是否开启平移功能
    zoomType: 'x', // 平移轴
    style: {
      fontFamily: chartFontFamily,
      fontWeight: chartFontWeight,
      fontSize: chartFontSize,
      lineHeight: chartLineHeight
    },
    // 设置图标更新的整体动画
    // plotOptions.series=> animation 初始化图表动画
    // animation: false,
    animation: {
      duration: 300,
      easing: 'linear' // linear | swing
    }
  },
  // X轴或者类别轴通常是水平方向的坐标轴
  xAxis: {
    // categories: null, // 通过获取数据列中数据的name和设置坐标轴的type为"category"可以初步制作出类别轴  eg: categories: ['Apples', 'Bananas', 'Oranges']
    // type: 'datetime', // "linear", "logarithmic", "datetime" 或者 "category" 在时间轴中，坐标轴的值是以毫秒为单位的，刻度线上显示像整数的小时或天的适当值。在类别轴中，默认采用图表数据点的名称做分类名称，如果定义类别名称数组可覆盖默认名称。
    // crosshair: {
    //   snap: true,
    //   width: 1,
    //   dashStyle: 'solid',
    //   color: '#dddddd',
    // },
    crosshair: true,
    tickmarkPlacement: 'on',
    lineWidth: 1, // 轴线的宽度
    tickLength: 4, // 刻度线的长度
    tickColor: '#cfcfcf',
    // tickInterval: 1 * 24 * 36e5, // one day
    gridLineWidth: 0,
    gridLineColor: '#f0f0f0',
    minorGridLineColor: '#f0f0f0',
    labels: {
      y: 15
    },
    minPadding: 0.0,
    maxPadding: 0.0,
    showEmpty: true, // 当坐标轴没有数据时是否显示轴线和标题
    showFirstLabel: true, // 是否显示第一个轴标签
    showLastLabel: true, // 是否显示最后一个轴标签
    startOfWeek: 1, // 对于时间轴，这个属性决定将星期几作为一周的开始。 0代表星期日，1代表星期一
    startOnTick: false,
    endOnTick: false
  },
  // Y轴或者值轴
  yAxis: {
    title: '',
    lineWidth: 0,
    // crosshair: {
    //   snap: true,
    //   width: 1,
    //   dashStyle: 'solid',
    //   color: '#dddddd',
    // },
    crosshair: false,
    allowDecimals: true, // 坐标轴刻度值是否允许为小数 true | false
    gridLineWidth: 1, // 网格线的宽度，当设置为 0 时，即为不显示网格线
    gridLineColor: '#eeeeee',
    // maxPadding: 0.5, // 内边距的最小值 0.05:100 * 0.05 = 5 px
    // minPadding: 0.5,
    offset: 0,
    // minPadding: 0.5,
    tickWidth: 0,
    tickPosition: 'outside',
    minorTickPosition: 'outside',
    // min: 0,
    // minRange: 1,
    startOnTick: false,
    endOnTick: false,
    startOfWeek: 1,
    labels: {
      align: 'left',
      x: 0,
      y: 0,
      style: {
        whiteSpace: 'nowrap'
      }
    }
  },
  // 数据提示框
  tooltip: {
    enabled: true,
    animation: true,
    borderRadius: 0,
    shadow: true,
    useHTML: true,
    shared: true, // 同时展现所有线(默认false)
    headerFormat: '<small class="chart-tooltip-key">{point.key}</small><table class="chart-tooltip-content">', // 提示框中标题行的HTML代码
    pointFormat: '<tr><td class="chart-tooltip-content-name" style="color: {series.color}">{series.name}</td><td class="chart-tooltip-content-dot">:</td><td class="chart-tooltip-content-value"><b>{point.y}</b></td><td class="chart-tooltip-content-suffix">{point.suffix}</td></tr>', // 提示框中该点的HTML代码
    footerFormat: '</table>',
    valueSuffix: '', // 一串字符被后置在每个Y轴的值之后(等于附加数值单位)
    valueDecimals: 2, // 数据提示框数据值小数保留位数
    xDateFormat: '%Y-%m-%d %H:%M:%S',
    // 为提示框添加CSS样式
    style: {
      color: '#333333',
      fontSize: chartFontSize,
      padding: '5px'
    }
  },
  // 图例说明是包含图表中数列标志和名称的容器
  legend: {
    enabled: true,
    layout: 'horizontal', // 图例数据项布局 horizontal(水平) | vertical(垂直)
    align: 'center', // 水平对齐 center | left | right
    verticalAlign: 'bottom', // 垂直对齐 bottom | top | middle
    y: 12, // 相对于 verticalAlign 来偏移
    borderWidth: 0,
    borderRadius: 2,
    borderColor: '#dddddd',
    margin: 5, // 15
    padding: 5, // 8
    // maxHeight: 22, // 图例最高高度
    itemStyle: {
      fontWeight: chartFontWeight
    },
    symbolHeight: 2, // 图例符号高度 12
    symbolRadius: 1,
    symbolWidth: 16
  },
  plotOptions: {
    line: {
      animation: false,
      cursor: 'default',
      allowPointSelect: false,
      connectNulls: true,
      lineWidth: 1, // default 2
      marker: {
        enabled: false,
        radius: 3,
        states: {
          // hover: {
          //   // enabled: true,
          //   // fillColor: this.color,
          //   lineWidth: 1,
          //   lineColor: '#fff',
          //   radius: 4,
          //   // radiusPlus: 2,
          // },
          // select: {
          //   // enabled: true,
          //   // fillColor: this.color,
          //   lineWidth: 2,
          //   lineColor: '#fff',
          //   radius: 6,
          //   // radiusPlus: 4,
          // },
        }
      }
    },
    column: {
      animation: false,
      pointPadding: 0.2,
      borderWidth: 0
    },
    area: {
      animation: false,
      allowPointSelect: false,
      fillOpacity: 0.3,
      lineWidth: 1
    },
    areaspline: {
      animation: false,
      allowPointSelect: false,
      fillOpacity: 0.3,
      lineWidth: 1
    },
    spline: {
      animation: false,
      cursor: 'default',
      allowPointSelect: false,
      connectNulls: true,
      lineWidth: 1
    },
    pie: {
      animation: false,
      cursor: 'pointer',
      allowPointSelect: true,
      depth: 20,
      showInLegend: true,
      dataLabels: {
        enabled: true,
        style: {
          color: '#333',
          fontFamily: chartFontFamily,
          fontSize: chartFontSize,
          fontWeight: chartFontWeight
        }
      },
      slicedOffset: 0
    },
    solidgauge: {
      animation: false,
      cursor: 'default',
      allowPointSelect: false,
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true
      }
    },
    scatter: {
      animation: false,
      cursor: 'pointer',
      allowPointSelect: true,
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)',
            lineWidth: 1
          },
          select: {
            enabled: true,
            fillColor: '#ffffff',
            lineColor: '#3F51B5',
            lineWidth: 2
          }
        }
      }
    },
    series: {
      turboThreshold: 0
    }
    // turboThreshold: 20000,
  }
}
