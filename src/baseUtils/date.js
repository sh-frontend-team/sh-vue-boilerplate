import moment from 'moment'

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm:ss'

const formats = {
  dateTime: DATE_TIME_FORMAT,
  date: DATE_FORMAT,
  time: TIME_FORMAT,
}

const distanceFactory = {

  // 今天
  todayDistance: () => {
    return [
      moment().startOf('days'), 
      moment().endOf('days'),
    ]
  },

  // 昨天
  yesterdayDistance: () => {
    return [
      moment().subtract(1, 'days').startOf('days'), 
      moment().subtract(1, 'days').endOf('days'),
    ] 
  },

  // 本周
  thisWeekDistance: () => {
    return [
      moment().startOf('week'),
      moment().endOf('week'),
    ]
  },

  // 上周
  lastWeekDistance: () => {
    return [
      moment().subtract(1, 'weeks').startOf('week'),
      moment().subtract(1, 'weeks').endOf('week'),
    ]
  },

  // 本月
  thisMonthDistance: () => {
    return [
      moment().startOf('month'),
      moment().endOf('month'),
    ]
  },

  // 上月
  lastMonthDistance: () => {
    return [
      moment().subtract(1, 'months').startOf('month'),
      moment().subtract(1, 'months').endOf('month'),
    ]
  },

  // 本季度
  thisQuarterDistance: () => {
    return [
      moment().startOf('quarter'),
      moment().endOf('quarter'),
    ]
  },

  // 上季度
  lastQuarterDistance: () => {
    return [
      moment().subtract(1, 'quarters').startOf('quarter'),
      moment().subtract(1, 'quarters').endOf('quarter'),
    ]
  },
}

// 时间区间
export function dateDistance(type) {
  return distanceFactory[`${type}Distance`]()
}

// 时间区间格式化后输出字符串
export function dateDistanceString(type, format) {
  const distance = dateDistance(type)
  const distanceFormated = distance.map((item) => item.format(formats[format]))
  // if (format === 'dateTime') {
  if (type === 'today' || type === 'yesterday') {
    return distanceFormated[0]
  } else {
    return distanceFormated.join(' ~ ')
  }
}

function toMoment(date, format) {
  if (moment.isMoment(date)) {
    return date
  } else if (moment.isDate(date)) {
    return moment(date)
  } else if (typeof date === 'string') {
    return moment(date, format || DATE_TIME_FORMAT)
  } else {
    throw new Error(`date[${date}]无法解析`)
  }
}

export function formatFriendlyDate(date, format) {
  if (!date) {
    console.warn('formatFriendlyDate(), 参数date不能为空')
    return ''
  }

  const d = toMoment(date, format)
  const now = moment()

  switch (now.year() - d.year()) {
    case 0: break;
    case 1: return d.format(`[去年]M[月]D[日] ${TIME_FORMAT}`)
    case 2: return d.format(`[前年]M[月]D[日] ${TIME_FORMAT}`)
    default: return d.format(DATE_TIME_FORMAT)
  }

  switch (now.month() - d.month()) {
    case 0: break;
    default: return d.format(`M[月]d[日] ${TIME_FORMAT}`)
  }

  switch (now.date() - d.date()) {
    case 0: break;
    case 1: return d.format(`[昨天] ${TIME_FORMAT}`)
    case 2: return d.format(`[前天] ${TIME_FORMAT}`)
    default: return d.format(`M[月]d[日] ${TIME_FORMAT}`)
  }

  switch (now.hours() - d.hours()) {
    case 0: break;
    default: return d.format(`${TIME_FORMAT}`)
  }

  const offsetMinutes = now.minutes() - d.minutes()
  switch (offsetMinutes) {
    case 0: break;
    default: return `${offsetMinutes}分钟前`
  }

  const offsetSeconds = now.seconds() - d.seconds()
  switch (offsetSeconds) {
    case 0: break;
    default: return `${offsetSeconds}秒前`
  }

  return '刚刚'
}

export function formatFriendlyOffset(start, end, format, unitLen = 2) {
  if (!start) {
    console.error('formatFriendlyOffset(), 参数start不能为空')
    return ''
  }

  const s = toMoment(start, format)
  const e = toMoment(end, format)

  if (s.isAfter(e)) {
    console.error('formatFriendlyOffset(), 参数start必须小于end')
    return ''
  }

  const unitsW = ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'month', 'year']
  const unitsR = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year']
  const unitTexts = ['毫秒', '秒', '分钟', '小时', '天', '个月', '年']
  const unitTextsR = unitTexts.reverse()

  let offset = []
  let sr = s.toArray().reverse()
  for (let i = 0; i < sr.length; i++) {
    if (s.get(unitsR[i]) === e.get(unitsR[i])) {
      offset.push(0)
    } else {
      e.subtract(sr[i], unitsW[i])
      offset.push(e.get(unitsR[i]))
    }
  }

  if (offset.length === 0) {
    return '刚刚'
  }

  offset = offset.reverse()

  let startIndex = -1
  for (let i = 0; i < offset.length; i++) {
    if (offset[i] !== 0) {
      startIndex = i
      break
    }
  }

  const offsetTexts = []
  for (let i = startIndex; i < startIndex + unitLen; i++) {
    const v = offset[i]
    if (v === 0) {
      continue
    }

    offsetTexts.push(v + unitTextsR[i])
  }

  return offsetTexts.join(' ')
}