class cache {
    constructor() {
        // 缓存对象
        this.cache_Obj = {};
        this.setTimeToClear();
    }

    handleCache() {
        return async (ctx, next) => {

            if (ctx.url.indexOf('/api/data') >= 0) {
                const key = ctx.url.replace(/^\/api\/data\//, "");
                const { cache_Obj } = this;
                console.log(key)
                // 存在走缓存，不存在拿到数据后加入缓存中
                if (cache_Obj[key]) {
                    ctx.body = cache_Obj[key] + "缓存数据";
                } else {
                    cache_Obj[key] = await this.delay(ctx.url);
                    ctx.body = cache_Obj[key];
                }
            } else {
                await next();
            }
        }
    };

    // 模拟请求数据
    delay(data) {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                reslove(data);
            }, 1000);
        });
    }

    // 定时每到0点清空缓存
    setTimeToClear() {
        let this_ = this;

        const date = new Date();

        //正式时，每天清空一次缓存
        //if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {

        //测试时，每分钟清空一次缓存 
        if (date.getSeconds() === 0) {
            console.log(new Date() + "清空缓存");
            this_.cache_Obj = {};
        } else {
            console.log("当前时间："+date+"未清空");
        }
        setTimeout(() => {
            this.setTimeToClear();
        }, 1000);
    }
}

module.exports = cache;