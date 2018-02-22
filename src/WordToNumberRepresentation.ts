import { Duration } from './Duration'

export class WordToNumberRepresentation {
  private readonly number: number

  public constructor (num: number) {
    this.number = num
  }

  public get years (): Duration {
    return new Duration({ years: this.number })
  }

  public get year (): Duration {
    return this.years
  }

  public get quarters (): Duration {
    return new Duration({ quarters: this.number })
  }

  public get quarter (): Duration {
    return this.quarters
  }

  public get months (): Duration {
    return new Duration({ months: this.number })
  }

  public get month (): Duration {
    return new Duration({ months: this.number })
  }

  public get weeks (): Duration {
    return new Duration({ weeks: this.number })
  }

  public get week (): Duration {
    return this.weeks
  }

  public get days (): Duration {
    return new Duration({ days: this.number })
  }

  public get day (): Duration {
    return this.days
  }

  public get hours (): Duration {
    return new Duration({ hours: this.number })
  }

  public get hour (): Duration {
    return this.hours
  }

  public get minutes (): Duration {
    return new Duration({ minutes: this.number })
  }

  public get minute (): Duration {
    return this.minutes
  }

  public get seconds (): Duration {
    return new Duration({ seconds: this.number })
  }

  public get second (): Duration {
    return this.seconds
  }

  public get milliseconds (): Duration {
    return new Duration({ milliseconds: this.number })
  }

  public get millisecond (): Duration {
    return this.milliseconds
  }
}
