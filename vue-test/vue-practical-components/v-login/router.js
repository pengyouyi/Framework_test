/*多语言constantRouter生成函数，所有权限都可以访问*/
const constantRouterGenerator = function (lang) {
	let constantRouter = [{
		path: '/',
		redirect: '/english/'
	}, {
		path: `/${lang}/`,
		redirect: `/${lang}/home`,
		component: Layout,
		children: [{}]
	}
}