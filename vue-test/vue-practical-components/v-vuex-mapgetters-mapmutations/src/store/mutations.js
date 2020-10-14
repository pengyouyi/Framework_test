import * as types from './mutation-types';

const mutations = {
	[types.SET_NAV](state, isShowNav) {
		state.isShowNav = isShowNav;
	}
};

export default mutations;