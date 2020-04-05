// 权限判断
function hasPermission(groups, permissionGroups) {
	if (groups.indexOf('dev') >= 0 || groups.indexOf('all') >= 0 || groups.indexOf('test-user') >= 0) return true; // dev all 直接通过
	if (!permissionGroups) return true; //目标没有分组限定
	return groups.some(group => permissionGroups.indexOf(group) >= 0);
}

//router前
router.beforeEach((to, from, next) => {
	NProgress.start(); //开启Progress
	from ? store.dispatch('SetLastRoute', from).then().catch(err => {
		console.log(err);
	}) : null;
	if (store.getters.token) { //判断是否有token
		if (langRouterGenerator(noReturn).indexOf(to.path) !== -1) { //有token则不能再回到login页面了
			next(`/${to.path.split('/')[1]}/news`);
			NProgress.done();
		} else if (hasPermission(store.getters.groups, to.meta.groups)) { //判断是否有权限进入
			if (to.meta.source) { //来源受限路由
				if (to.meta.source.indexOf(from.meta.id) >= 0 || to.meta.id === from.meta.id || from.name === null) { //控制某个路由只能由某个路由进入
					next();
				} else { //如果不是在source来源内的路由，则回退
					next(false);
					NProgress.done();
				}
			} else { //正常路由
				next();
			}
		} else { //无权进入
			next(`/${to.meta.lang}/401`);
			NProgress.done();
		}
	} else if (langRouterGenerator(noLoginList).indexOf(to.path) >= 0 || to.path.indexOf('english/phone')) { //在免登录白名单，直接进入
		next();
	} else { //否则全部重定向到登录页
		next(`/${to.path.split('/')[1]}/login`);
		NProgress.done();
	}
});