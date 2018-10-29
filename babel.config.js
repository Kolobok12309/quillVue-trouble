module.exports = (api) => {
    const presets = ['@vue/app'];
    const plugins = [];

    api.cache(true);

    return {
        presets,
        plugins,
    };
};
