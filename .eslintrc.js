module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:jsx-a11y/recommended"
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    },
    "import/resolver": {
      alias: {
        map: ["src", "./src"]
      }
    }
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "@typescript-eslint"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-string-refs": "warn",
    "react/jsx-no-target-blank": 0,
    "react/jsx-props-no-multi-spaces": [2],
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-max-depth": [2, { "max": 6 }],
    "react/no-unused-prop-types": [2],// 禁止定义未使用的propTypes的属性
    "react/prop-types": [2, { skipUndeclared: true }],// 防止在react组件定义中缺少props验证
    "react/sort-comp": [2, {
      "order": [
        "constructor",        // 构造函数
        "static-methods",     // 静态方法
        "handlers",           // 事件处理
        "everything-else",    // 其他方法
        "lifecycle",          // 生命周期函数
        "renders"             // 渲染方法
      ],
      "groups": {
        "handlers": [
          "/^handler[A-Z]\w+$"
        ],
        "renders": [
          "/^render.+$/",
          "render"
        ],
        "lifecycle": [
          "getDerivedStateFromProps",
          "componentDidMount",
          "shouldComponentUpdate",
          "getSnapshotBeforeUpdate",
          "componentDidUpdate",
          "getDerivedStateFromError",
          "componentDidCatch",
          "componentWillUnmount"
        ]
      }
    }],//强制组件方法顺序
    "react/jsx-handler-names": [1],           // 限制事件处理命名习惯,用作事件处理程序的组件方法的前缀。默认为handle,用作事件处理程序的props的前缀。默认为on
    "jsx-a11y/anchor-is-valid": [0],
    "indent": [1, 2, { "SwitchCase": 1 }],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "new-cap": 2,                             // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    "new-parens": 2,                          // new时必须加小括号
    "camelcase": 2,                           // 强制驼峰法命名
    "callback-return": 2,                     // 避免多次调用回调
    "no-undef": 2,                            // 不能有未定义的变量,
    "no-shadow": 2,                           // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    "no-proto": 2,                            // 禁止使用__proto__属性
    "no-nested-ternary": 2,                   // 禁止使用嵌套的三目运算
    "no-use-before-define": 2,                // 未定义前不能使用
    "no-unused-vars": [2, {
      "vars": "all",
      "args": "after-used"
    }], //不能有声明后未被使用的变量或参数
    "no-unused-expressions": 2,               // 禁止无用的表达式
    "no-unreachable": 2,                      // 不能有无法执行的代码
    "no-unneeded-ternary": 2,                 // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    "no-eval": 2,                             // 禁止使用eval
    "no-func-assign": 2,                      // 禁止重复的函数声明
    "no-dupe-keys": 2,                        // 在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-alert": 2,                            // 禁止使用alert confirm prompt
    "no-console": 0,
    "quote-props": ["error", "consistent-as-needed"],
    "no-return-assign": 0,
    "comma-dangle": [2, "never"],             // 对象字面量项尾不能有逗号
    "max-lines": [2, 500],                    // 单个文件最大500行
    "max-lines-per-function": ["error", {
      "max": 50,
      "skipBlankLines": true,
      "skipComments": true
    }], // 单个函数最大长度
    "max-depth": ["error", 6],
    "max-statements-per-line": ["error", { "max": 4 }]
  }
};