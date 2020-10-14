import Mock from 'mockjs';
import feedbackApi from './feedback.js';
import projectClassifyApi from './project_classify.js';

Mock.mock(/\/feedback/, 'post', feedbackApi.getFeedback);
Mock.mock(/\/project_classify/, 'get', projectClassifyApi.getProjectClassify);

export default Mock;