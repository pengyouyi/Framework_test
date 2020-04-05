{
	path: `/${lang}/project`,
	redirect: `/${lang}/project/library/1`,
	component: Layout,
	children: [{
		path: 'library/:page',
		name: lang === 'english' ? 'Project Library' : '项目库',
		component: Project,
		meta: {
			id: 'project library',
			groups: ['project'],
			search: true,
			lang
		}
	}, {
		path: 'information/:id',
		name: lang === 'english' ? 'Project Information' : '项目详情',
		component: ProjectInfo,
		meta: {
			id: 'project information',
			groups: ['project'],
			bread: true,
			lang
		}
	}]
}