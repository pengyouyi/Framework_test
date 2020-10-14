//登录前流程，获取groups和user
export function getUserData(password) {
	return new Promise((resolve, reject) => {
		//获取groups
		axios.get(url.groups).then(groupsRes => {
			//保存groups
			store.dispatch('SetGroups', groupsRes.data.groups).then(() => {
				//获取user信息
				axios.get(url.user).then(userRes => {
					//保存user信息
					password ? userRes.data.password = password : null
					store.dispatch('SetUserInfo', userRes.data).then(() => {
						resolve();
					}).catch(err => {
						reject(err);
					});
				}).catch(err => {
					reject(err);
				});
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