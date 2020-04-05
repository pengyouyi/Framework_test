import {
	loginByEmail,
	logout,
	getInfo
} from 'api/login';
import Cookies from 'js-cookie';
import axios from 'axios';
import url from '@/url.js';
import Vue from 'vue';

const user = {
	state: {
		token: Cookies.get('Token'),
		groups: Cookies.get('Groups') ? JSON.parse(Cookies.get('Groups')) : [],
		username: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).username : '',
		password: Cookies.get('UserInfo') ? JSON.parse(Cookies.get('UserInfo')).password : '',
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
			token ? Cookies.set('Token', token) : Cookies.remove('Token');
		},
		SET_GROUPS: (state, groups) => {
			state.groups = groups;
			groups.length ? Cookies.set('Groups', groups) : Cookies.remove('Groups');
		},
		SET_USERNAME: (state, username) => {
			state.username = username;
		},
	},

	actions: {
		// 设置token
		SetToken({
			commit
		}, token) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', token);
				resolve();
			}).catch(err => {
				console.log(err);
			});
		},
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
		//保存个人信息
		SetUserInfo({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				let user = {
					id: userInfo.pk,
					username: userInfo.username,
					password: userInfo.password,
					firstname: userInfo.first_name,
					lastname: userInfo.last_name,
					email: userInfo.email,
					city: userInfo.city,
					company: userInfo.company_name,
					position: userInfo.position,
					photo: userInfo.photo,
					birthdate: userInfo.birthdate,
					gender: userInfo.gender,
					addres: userInfo.addres
				};
				Cookies.set('UserInfo', user);
				commit('SET_ID', user.id);
				commit('SET_USERNAME', user.username);
				commit('SET_PASSWORD', user.password);
				commit('SET_FIRSTNAME', user.firstname);
				commit('SET_LASTNAME', user.lastname);
				commit('SET_EMAIL', user.email);
				commit('SET_CITY', user.city);
				commit('SET_COMPANY', user.company);
				commit('SET_POSITION', user.position);
				commit('SET_PHOTO', user.photo);
				commit('SET_BIRTHDATE', user.birthdate);
				commit('SET_GENDER', user.gender);
				commit('SET_ADDRES', user.addres);
				resolve();
			}).catch(err => {
				console.log(err);
			});
		},

	}
};

export default user;
