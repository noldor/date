import { DurationParametersInterface } from './DurationParametersInterface'

export class DurationParametersNormalizer {
  private readonly parameters: {
    years: number,
    quarters: number,
    months: number,
    weeks: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
  }

  public constructor (parameters: DurationParametersInterface) {
    this.parameters = {
      years: parameters.years || 0,
      quarters: parameters.quarters || 0,
      months: parameters.months || 0,
      weeks: parameters.weeks || 0,
      days: parameters.days || 0,
      hours: parameters.hours || 0,
      minutes: parameters.minutes || 0,
      seconds: parameters.seconds || 0,
      milliseconds: parameters.milliseconds || 0
    }
  }

  public normalize () {
    return this.normalizeUnit('milliseconds', 'seconds', 1000)
      .normalizeUnit('seconds', 'minutes', 60)
      .normalizeUnit('minutes', 'hours', 60)
      .normalizeUnit('hours', 'days', 24)
      .normalizeUnit('days', 'weeks', 7)
      .parameters
  }

  private normalizeUnit (
    unit: keyof DurationParametersInterface,
    nextUnit: keyof DurationParametersInterface,
    max: number
  ): this {
    if (this.parameters[unit] < max) return this

    const nextUnitValue = Math.trunc(this.parameters[unit] / max)
    this.parameters[nextUnit] = this.parameters[nextUnit] + nextUnitValue
    this.parameters[unit] = this.parameters[unit] - nextUnitValue * max

    return this
  }
}
