const HOST = process.env.HOST
module.exports = {
    
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    productionSourceMap: false,
    devServer: {
        host: HOST || '0.0.0.0',
        open: true,
        disableHostCheck:true
    }
}