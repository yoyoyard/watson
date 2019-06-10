// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: "http://watson.yimei.io",
    public: "watson.yimei.io"
  }
};
