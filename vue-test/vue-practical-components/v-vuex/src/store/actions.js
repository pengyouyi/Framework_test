import * as types from './mutation-types';

export const setNav = function({commit}, isShowNav) {
	commit('SET_NAV', isShowNav);
}