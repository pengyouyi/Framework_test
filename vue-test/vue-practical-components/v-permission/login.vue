<template>
<div class="login-container">
	<el-row class="login-form">
		<pncInput class="username" :placeholder="$t('common.username') | capitalize" v-model="form.username" :validator="validator.username"></pncInput>
		<pncInput class="password" type="password" :placeholder="$t('common.password') | capitalize" v-model="form.password" :validator="validator.password" @enter="onLogin"></pncInput>
		<el-row class="login-row">
			<pncCheck v-model="check">{{i18n[$lang].label}}</pncCheck>
			<router-link class="href" :to="`/${$route.meta.lang}/reset`">{{i18n[$lang].reset}}?</router-link>
		</el-row>
	</el-row>
	<el-row class="button-sec">
		<pncButton @click="onLogin" :loading="loading">{{$t('common.signin') | upperCase}}</pncButton>
	</el-row>
</div>
</template>

<script>
	export default {
		data() {
			return {
				i18n: {
					en: {
						reset: 'Forget Password',
						label: 'Remember me',
						question: {
							question: 'No account',
							jumper: 'Register'
						}
					},
					cn: {
						reset: '忘记密码',
						label: '记住密码',
						question: {
							question: '没有账号',
							jumper: '注册'
						}
					}
				},
				loading: false,
				form: {
					username: '',
					password: ''
				},
				check: true,
				source: this.$axios.CancelToken.source()
			};
		},
		computed: {
			validator() {
				return {
					username: {
						rule: this.form.username.length > 0,
						tip: this.$i18n.messages[this.$i18n.locale].common.form.tip.username
					},
					password: {
						rule: this.$utils.passwordValid(this.form.password),
						tip: this.$i18n.messages[this.$i18n.locale].common.form.tip.password1
					}
				};
			}
		},
		methods: {
			//登录完了保存token
			onLogin() {
				if (this.$utils.isValid(this.validator)) {
					this.loading = true;
					this.$axios.post(this.$url.login, this.form, {
						cancelToken: this.source.token
					}).then(res => {
						this.goSetToken(res.data.token);
					}).catch(err => {
						this.loading = false;
						this.$error(err, {
							400: {
								en: 'The username or password is wrong, please retry or find your password',
								cn: '用户名或密码有误，请重新输入或找回密码'
							}
						});
					});
				} else {
					this.$message.error(this.$i18n.messages[this.$i18n.locale].common.form.tip.invalid);
				}
			},
			//保存完token去获取user信息
			goSetToken(token) {
				this.$store.dispatch('SetToken', token).then(() => {
					this.getUserData(this.form.password);
				}).catch(err => {
					this.loading = false;
					this.$message.error('login failed,please retry');
				});
			},
			//获取并保存user信息
			getUserData(password) {
				this.$utils.getUserData(password).then(() => {
					this.$router.push(`/${this.$route.meta.lang}/`);
				}).catch(err => {
					this.loading = false;
					this.$error(err);
				});
			}
		},
		beforeDestroy() {
			this.source.cancel();
			this.loading = false;
		}
	};

</script>


