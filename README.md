ui组件库项目，其基础由create-react-app构建。

你可以使用以下指令来管理项目：
 - `yarn start`
 - `yarn test`
 - `yarn build-docs`
 - `yarn build`

## `yarn start`
这是一个开发者环境，使用该指令你可以在本机的3000端口获得一个可[预览](http://localhost:3000)的演示环境。

## `yarn test`
使用该指令，将会调用jest来对项目进行测试，你可以通过添加`--coverage`参数来获得HTML版的测试报告。

## `yarn build-docs`
使用该指令，你将会在build目录获得一个说明文档的工程，通过`serve`模块，你可以将这个目录直接对外输出成站点。

## `yarn build`
使用该指令，你将会在dist目录中获得完全编译后的JS代码，这份代码移除了docs目录的内容，所以目录中内容将对应src/lib中的内容。


## 关于依赖的说明：
考虑到最终输出模块的大小，以及通用性，所以只保留了src/lib目录中文件的依赖，并且还移除了react与react-dom两个包的依赖，毕竟这两个包本身就已经是使用该模块的基础包了，没有必要在这里再引用一次，以避免以后的版本冲突。
