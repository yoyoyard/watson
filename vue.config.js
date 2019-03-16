// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: "https://safety.yimei.io",
    public: "safety.yimei.io"
  }
};
