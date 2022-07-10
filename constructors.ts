interface IMyClass {
  name: string;
}

interface IMyConstructor {
  new (name: string, parent?: IMyClass | null): IMyClass;
}

type TMyClass = {name: string};

type TMyConstructor = {
  constructor: new (name: string, parent?: IMyConstructor | null) => IMyConstructor;
};

class MyClass implements IMyClass {
  protected parent?: MyClass | null = null;
  public name: string;

  constructor(name: string, parent: MyClass | null = null) {
    this.name = name;
    this.parent = parent;
  }
}

const MyClassB: IMyConstructor = MyClass;
const MyClassC: TMyClass = MyClass;
