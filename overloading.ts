function operateNumbers(num: number): number;
function operateNumbers(num: number, num2: number): number;
function operateNumbers(num: number, num2?: number, msg: string = ''): number {
  let result = num;
  if (num2) {
    result += num2;
  }
  let additionalMessage = '';
  if (msg) {
    additionalMessage = `\n${msg}`;
  }
  console.log(`Result is: ${result}${additionalMessage}`);
  return result;
}

type LogLevel = 'info' | 'warn' | 'error'

type LogEntries = Record<string, string>

class Overloaded {
  private static readonly DEFAULT_LOG_LEVEL: LogLevel = 'warn'

  private tskv<T extends LogEntries>(_logEntries: T): string {
    /* form tskv */
    return ""
  }

  log(it: Error, msg?: string)
  log<T extends LogEntries>(logEntries: T, msg?: string, level?: LogLevel)
  log<T extends LogEntries>(it: Error | T, msg?: string, level?: LogLevel) {
    if (it instanceof Error) {
      return console.error(it.message, it.stack, msg)
    }
    console[level || Overloaded.DEFAULT_LOG_LEVEL](`${msg}\n${this.tskv(it)}`)
  }
}