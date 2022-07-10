/// <reference lib="esnext" />

/* InstanceType implementation */
type _InstanceType<T extends { new (...args: any[]): any }> = T extends { new (...args: any[]): infer U } ? U : never;

class Counter {
  private _timerId?: number;

  constructor(private _count = 0, private _interval = 1000) {
    this.scheduleTick = this.scheduleTick.bind(this);
  }

  private scheduleTick(): void {
    this._count++;
    this._timerId = setTimeout(this.scheduleTick, this._interval);
  }

  get count(): number {
    return this._count;
  }

  get interval(): number {
    return this._interval;
  }

  startCounting(): void {
    this._timerId = setTimeout(this.scheduleTick, this._interval);
  }
  stopCounting(): void {
    if (this._timerId) {
      clearTimeout(this._timerId);
    }
  }
  destroy(): void {
    this.stopCounting();
  }
}

/* InstanceType usage */
type CounterInstance = InstanceType<typeof Counter>;
