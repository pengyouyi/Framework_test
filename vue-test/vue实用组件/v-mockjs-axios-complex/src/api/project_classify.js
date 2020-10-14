import HTTP from '../utils/fetch';

export function getProjectClassify() {
  return HTTP({
    url: '/project_classify',
    method: 'get'
  });
}
