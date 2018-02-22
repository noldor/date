import { DurationParametersInterface } from './DurationParametersInterface'
import { DurationParametersNormalizer } from './DurationParametersNormalizer'
import { DateTime } from './DateTime'
import { wordsToNumberMixin } from './wordsToNumberMixin'
import { WordsToNumberMethods } from './WordsToNumberMethodsInterface'

const years: unique symbol = Symbol('years')
const quarters: unique symbol = Symbol('quarters')
const months: unique symbol = Symbol('months')
const weeks: unique symbol = Symbol('weeks')
const days: unique symbol = Symbol('days')
const hours: unique symbol = Symbol('hours')
const minutes: unique symbol = Symbol('minutes')
const seconds: unique symbol = Symbol('seconds')
const milliseconds: unique symbol = Symbol('milliseconds')

export class Duration {
  private [years]: number
  private [quarters]: number
  private [months]: number
  private [weeks]: number
  private [days]: number
  private [hours]: number
  private [minutes]: number
  private [seconds]: number
  private [milliseconds]: number

  public constructor (parameters: DurationParametersInterface) {
    const normalized = new DurationParametersNormalizer(parameters).normalize()
    this[years] = normalized.years
    this[quarters] = normalized.quarters
    this[months] = normalized.months
    this[weeks] = normalized.weeks
    this[days] = normalized.days
    this[hours] = normalized.hours
    this[minutes] = normalized.minutes
    this[seconds] = normalized.seconds
    this[milliseconds] = normalized.milliseconds
  }

  public get years (): number {
    return this[years]
  }

  public get quarters (): number {
    return this[quarters]
  }

  public get months (): number {
    return this[months]
  }

  public get weeks (): number {
    return this[weeks]
  }

  public get days (): number {
    return this[days]
  }

  public get hours (): number {
    return this[hours]
  }

  public get minutes (): number {
    return this[minutes]
  }

  public get seconds (): number {
    return this[seconds]
  }

  public get milliseconds (): number {
    return this[milliseconds]
  }

  public get ago () {
    return new DateTime()
  }
}

wordsToNumberMixin(Duration.prototype)
wordsToNumberMixin(Duration)

export const Test: typeof Duration & typeof WordsToNumberMethods = Duration
