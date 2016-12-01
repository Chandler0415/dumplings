##模块的基本使用  

创建一个js文件  

```
var mark = 'mark';
//使用exports对象将变量传递到模块外部
exports.mark = mark;
```

在另一个js文件中引入该模块

```
// 引入模块时同级目录下需要使用./ 只有当引入nodejs自带的模块才可以直接写模块名
var test = require('./module.js');
```

###当引入该模块时，模块中的所有代码都会被执行

####require.main

可以用require.main变量来检测一个模块是否为程序的主模块 也就是说该模块是不是用nodejs命令执行的

```
if(module === require.main) {
    console.log('module');
}
```

####__filename

```
// 获取当前模块文件名
console.log(__filename);
```

####__dirname

```
// 获取当前模块目录名
console.log(__dirname);
```

####require.resolve()

```
// 函数查询某个模块的带有绝对路径的文件名
// 使用require.resolve()函数不会加载该模块
require.resolve();
```

在Node.js中，可以使用require.resolve函数来查询某个模块文件的带有完整绝对路径的文件名，代码如下所示。
`require.resolve('./testModule.js');`  
在这行代码中，我们使用require.resolve函数来查询当前目录下testModule.js模块文件的带有完整绝对路径的模块文件名。

注意：使用require.resolve函数查询模块文件名时并不会加载该模块。

####require.cache

```
// require.cache对象缓存了所有已被加载的模块的缓存区
// console.log(require.cache);
```

####require.cache

```
// 删除缓存区里的某个模块 删除该模块后，下次加载该模块时重新运行该模块
delete require.cache[require.resolve('./module.js')];
```