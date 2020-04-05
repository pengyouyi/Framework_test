//刷新token
setInterval(function () {
	let token = Cookies.get('Token') || '';
	token ? refreshToken(token) : null;
}, 420000);

//刷新失败则再次刷新
function refreshToken(token) {
	axios.post(url.refreshToken, {
		token
	}).then(res => {
		store.dispatch('SetToken', res.data.token).then(res2 => {}).catch(err2 => {});
	}).catch(err => {
		login().then(() => {
			axios(err.config);
		});
	});
}

//login的多种种方式
function loginMethod() {
	return [url.login, {
		username: store.getters.username,
		password: store.getters.password
	}];
}

//重新登录
function login() {
	return new Promise((resolve, reject) => {
		axios.post(loginMethod()[0], loginMethod()[1], {
			headers: {
				Authorization: ''
			}
		}).then(res => {
			store.dispatch('SetToken', res.data.token).then(() => {
				resolve();
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	}).catch(err => {
		console.log(err);
	});
}

//axios的请求拦截器，用来在每次发送请求前，如果存在token则加到headers里
axios.interceptors.request.use(function (config) {
	let AUTH_TOKEN = store.getters.token;
	let csrfToken = Cookies.get('csrftoken');
	if (csrfToken) {
		config.headers['X-CSRFToken'] = csrfToken;
	}
	if (AUTH_TOKEN && config.headers['Authorization'] !== '') {
		config.headers['Authorization'] = `JWT ${AUTH_TOKEN}`;
	}
	return config;
}, function (err) {
	return Promise.reject(err);
});

//axios的响应拦截器，可以用来处理错误信息
axios.interceptors.response.use(function (res) {
	return res;
}, function (err) {
	let config = err.config;
	if (axios.isCancel(err)) { //被取消的axios
		return Promise.reject('canceled');
	}
	console.log('error:', err.response ? err.response : err.message);
	if (err.response) {
		switch (err.response.status) {
			case 401: //如果错误是401则直接重登陆,登录后再重试
				console.log('去重登陆');
				return login().then(() => {
					console.log('重登成功');
					return axios(config);
				});
				break;
			case 404:
			case 400: //404和400错误直接reject，不需要重试
				return Promise.reject(err);
				break;
			default:
				break;
		}
	}
	if (!config || !config.retry) return Promise.reject(err);
	config.__retryCount = config.__retryCount || 0;
	if (config.__retryCount >= config.retry) {
		return Promise.reject(err);
	}
	config.__retryCount += 1;
	var backoff = new Promise(function (resolve) {
		setTimeout(function () {
			resolve();
		}, config.retryDelay || 1000);
	});
	return backoff.then(function () {
		return axios(config);
	});
});

// 权限判断
function hasPermission(groups, permissionGroups) {
	if (groups.indexOf('dev') >= 0 || groups.indexOf('all') >= 0 || groups.indexOf('test-user') >= 0) return true; // dev all 直接通过
	if (!permissionGroups) return true; //目标没有分组限定
	return groups.some(group => permissionGroups.indexOf(group) >= 0);
}

//多语言路由生成器
function langRouterGenerator(routers) {
	let temp = [];
	for (let lang of langs) {
		for (let router of routers) {
			temp.push(`/${lang}${router}`)
		}
	}
	return temp;
}
const noReturn = ['/login', '/home']; //登陆后不能回到的页面
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

//router后
router.afterEach(() => {
	window.scrollTo(0, 0); //跳转后回到页面顶部
	Vue.prototype.$lang = utils.langSwitch(router.currentRoute.meta.lang); //简写的lang
	i18n.locale = router.currentRoute.meta.lang; //全称的lang
	axios.defaults.baseURL = url.base; //设置axios的根请求路径
	document.title = `${router.currentRoute.name}-China Investor Market-Boutique Firm-Global Cloud Investment Platform-GCIP`;
	NProgress.done(); // 结束Progress
});