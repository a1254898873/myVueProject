const HOST = process.env.HOST
module.exports = {
    productionSourceMap: false,
    devServer: {
        host: HOST || '0.0.0.0',
        open: true,
        disableHostCheck:true
    },

    lintOnSave: false,

    outputDir: 'D:\\dataclub1\\src\\main\\resources\\static'
}