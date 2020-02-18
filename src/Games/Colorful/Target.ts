import NodeEvent from "events";

interface Options {
  边长: number,
  形状种类: number,
  颜色种类: number,
  模式: "形状" | "颜色" | "混合"
}

const 目标 = Symbol("目标");

class Target extends NodeEvent {
  private options: Options;
  private [目标]: any;

  constructor (options: Options = {} as Options) {
    super();
    this.options = options;
    this.init();
  }

  public init () {
    switch (this.options.模式) {
      case "形状": {
        break;
      }
      case "颜色": {
        break;
      }
      case "混合": {
        break;
      }
    }
  }

  getTarget () {

  }

  attainment () {

  }
}

export default Target;
