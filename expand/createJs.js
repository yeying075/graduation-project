const { createApiJs, createStoreJs } = require('chenms_auto_create_file')
const path = require('path')
// 公共的参数
const commonJson = {
    // yapi接口文档的配置
    // hostname: '39.106.196.57',
    // port: 3000,
    // path: '/api/open/plugin/export-full?type=json&pid=130&status=all&token=9e5b30f82c324b31b4826cd54593a608a7301326e0e65e8948b313cc02808980',
    // apifox接口文档的配置
    hostname: '127.0.0.1',
    port: 4523,
    path: '/export/openapi?projectId=3440180&specialPurpose=openapi-generator',
    interfaceType: 'apifox',
    // 导入interface目录的前缀
    interfacePrefix: '@/interface',
    // 不自动生成接口的url,这个字段主要用来过滤不想生成接口的url,默认是空数组
    excludeList: ['/time/list'],
    // 对url进行处理的回调
    // 不设置的话会默认返回小驼峰, 如:参数path为 /my/list/detailed的接口 会默认返回 myListDetailed
    // 注意:1.这个function的返回值只能是字符串,如果返回其他类型的则会返回默认设置
    //      2.如果直接返回pathTitle也会返回默认设置
    // 因为生成pinia相关文件之后,再次生成的话并不会直接把新的覆盖到旧的去,只会比较新旧差异,然后再把有差异的添加到旧的文件里,
    // 所以这个设置完之后尽量不要再修改了,除非pinia文件还未生成
    formatePathCb: (pathTitle) => {
        return pathTitle.replace(/(\/|\-|\_)/g, '')
    },
    // 对生成的文件名称进行处理
    // 不设置的话会默认返回 `${pathTitle}`名称
    // 注意:1.这个function的返回值只能是字符串,如果返回其他类型的则会返回默认设置
    //      2.如果直接返回pathTitle也会返回默认设置
    // 因为生成pinia相关文件之后,再次生成的话并不会直接把新的覆盖到旧的去,只会比较新旧差异,然后再把有差异的添加到旧的文件里,
    // 所以这个设置完之后尽量不要再修改了,除非pinia文件还未生成
    formateFileNameCb: (pathTitle) => {
        return pathTitle.split('--')[1]
    }
}
// 生成pinia的函数
createStoreJs({
    config: {
        ...commonJson,
        // 生成文件要放置的目录
        createPath: path.resolve(__dirname, '../src/store'),
        // 导入api目录的前缀
        apiPrefix: '@/api',
        // 头部需要引入的
        // 这边会让对应的文件内容跟这个模板里的内容做比较,如果有存在了头部就不会再引入,不存在才引入
        topTemplate: ``,
        // 是否要删除生成pinia文件夹里非自动生成的文件
        isDelExcessiveFile: false,
        // 对pinia的state里的数据字段进行处理
        // 不设置的话会默认返回 `${pathTitle}Data` 也就是处理后的path前面加Data
        // 注意:1.这个function的返回值只能是字符串,如果返回其他类型的则会返回默认设置
        //      2.如果直接返回pathTitle也会返回默认设置
        // 因为生成pinia相关文件之后,再次生成的话并不会直接把新的覆盖到旧的去,只会比较新旧差异,然后再把有差异的添加到旧的文件里,
        // 所以这个设置完之后尽量不要再修改了,除非pinia文件还未生成
        formateStateCb: (pathTitle) => {
            return `${pathTitle}Datt`
        },
        // 对pinia的action里的数据字段进行处理
        // 不设置的话会默认返回 `${pathTitle}Api` 也就是处理后的path前面加Api
        // 注意:1.这个function的返回值只能是字符串,如果返回其他类型的则会返回默认设置
        //      2.如果直接返回pathTitle也会返回默认设置
        // 因为生成pinia相关文件之后,再次生成的话并不会直接把新的覆盖到旧的去,只会比较新旧差异,然后再把有差异的添加到旧的文件里,
        // 所以这个设置完之后尽量不要再修改了,除非pinia文件还未生成
        formateActionCb: (pathTitle) => {
            return `${pathTitle}Api123`
        }
    }
})

// 生成api的函数
createApiJs({
    config: {
        ...commonJson,
        // 生成文件要放置的目录
        createPath: path.resolve(__dirname, '../src/api'),
        // 头部需要引入的
        // 这边会让对应的文件内容跟这个模板里的内容做比较,如果有存在了头部就不会再引入,不存在才引入
        topTemplate: `import request from '@/service/index'`,
        // 对生成的api里的body进行处理
        // eslint-disable-next-line no-unused-vars
        formateApiBodyCb: (item) => {
            return `request.${item.method.toLowerCase()}("${item.path}", data);`
        }
    }
})

