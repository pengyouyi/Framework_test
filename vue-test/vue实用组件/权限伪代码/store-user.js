
import Cookies from 'js-cookie';

const user = {
	state: {
		groups: Cookies.get('Groups') ? JSON.parse(Cookies.get('Groups')) : [],
	},

	mutations: {
		SET_GROUPS: (state, groups) => {
			state.groups = groups;
			groups.length ? Cookies.set('Groups', groups) : Cookies.remove('Groups');
		}
	},

	actions: {
		//设置groups
		SetGroups({
			commit
		}, groups) {
			return new Promise((resolve, reject) => {
				if (groups.length) {
					let temp = [];
					for (let group of groups) {
						temp.push(group.name);
					}
					commit('SET_GROUPS', temp);
					resolve(temp);
				} else {
					commit('SET_GROUPS', ['none']);
					resolve(['none']);
				}
			}).catch(err => {
				console.log(err);
			});
		},
	}
};

export default user;
