import { LocaleInterface } from './locales/LocaleInterface'
import { FormatterInterface } from './formatters/FormatterInterface'
import { DateOptionsInterface } from './DateOptionsInterface'
import { WordToNumberRepresentation } from './WordToNumberRepresentation'
import { wordsToNumberMixin } from './wordsToNumberMixin'
import { WordsToNumberMethods } from './WordsToNumberMethodsInterface'

export class DateTime extends Date implements WordToNumberRepresentation{
  private static locale: LocaleInterface = {}
  private static formatter: FormatterInterface = {}
  private 'constructor': typeof DateTime
  private locale: LocaleInterface
  private formatter: FormatterInterface

  public constructor (
    options: {
      locale?: LocaleInterface,
      formatter?: FormatterInterface,
      date?: Date | DateOptionsInterface | number
    } = {}
  ) {
    if (options.date === undefined) {
      super()
    } else {
      (options.date instanceof Date || typeof options.date === 'number')
        ? super(options.date)
        : super(...this.extractDateOptions(options.date))
    }
    this.locale = options.locale || this.constructor.locale
    this.formatter = options.formatter || this.constructor.formatter
  }

  public static get now (): DateTime {
    return new this()
  }

  public static get current (): DateTime {
    return new this()
  }

  public get one () {
    return new WordToNumberRepresentation(1)
  }

  public get year (): number {
    return this.getFullYear()
  }

  public get month (): number {
    return this.getMonth()
  }

  public get day (): number {
    return this.getDate()
  }

  public get hours (): number {
    return this.getHours()
  }

  public get minutes (): number {
    return this.getMinutes()
  }

  public get seconds (): number {
    return this.getSeconds()
  }

  public get milliseconds (): number {
    return this.getMilliseconds()
  }

  public static setGlobalLocale (locale: LocaleInterface): typeof DateTime {
    this.locale = locale

    return this
  }

  public static setGlobalFormatter (formatter: FormatterInterface): typeof DateTime {
    this.formatter = formatter

    return this
  }

  public static fromJSDate (date: Date): DateTime {
    return new this({ date })
  }

  public setLocale (locale: LocaleInterface): DateTime {
    return new this.constructor({ locale, formatter: this.formatter, date: this })
  }

  public setFormatter (formatter: FormatterInterface): DateTime {
    return new this.constructor({ locale: this.locale, formatter, date: this })
  }

  public clone (): DateTime {
    return new this.constructor({ date: this })
  }

  public getYear () {
    return this.getFullYear()
  }

  public setFullYear (year: number, month?: number, day?: number): this {
    return this.newInstanceFromDateOptions({ year })
  }

  public setYear (year: number, month?: number, day?: number): this {
    return this.setFullYear(year, month, day)
  }

  public setMonth (month: number, day?: number): this {
    return this.newInstanceFromDateOptions({ month })
  }

  public setDay (day: number): this {
    return this.newInstanceFromDateOptions({ day })
  }

  public setDate (day: number): this {
    return this.setDay(day)
  }

  public setHours (hours: number, minutes?: number, seconds?: number, milliseconds?: number): this {
    return this.newInstanceFromDateOptions({ hours })
  }

  public setMinutes (minutes: number, seconds?: number, milliseconds?: number) {
    return this.newInstanceFromDateOptions({ minutes })
  }

  public setSeconds (seconds: number, milliseconds?: number) {
    return this.newInstanceFromDateOptions({ seconds })
  }

  public setMilliseconds (milliseconds: number): this {
    return this.newInstanceFromDateOptions({ milliseconds })
  }

  public setTime (time: number): this {
    return new this.constructor({ locale: this.locale, formatter: this.formatter, date: time })
  }

  public toString (): string {
    return this.formatter.format(this)
  }

  public valueOf (): number {
    return this.getTime()
  }

  private newInstanceFromDateOptions (options: DateOptionsInterface) {
    const dateOptions = {
      ...{
        year: this.year,
        month: this.month,
        day: this.day,
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        milliseconds: this.milliseconds
      },
      ...options
    }
    return new this.constructor(
      {
        locale: this.locale,
        formatter: this.formatter,
        date: dateOptions
      })
  }

  private extractDateOptions (options: any): [number, number, number, number, number, number, number] {
    return [
      options.year,
      options.month,
      options.day,
      options.hours,
      options.minutes,
      options.seconds,
      options.milliseconds
    ]
  }
}

wordsToNumberMixin(DateTime.prototype)
wordsToNumberMixin(DateTime)
