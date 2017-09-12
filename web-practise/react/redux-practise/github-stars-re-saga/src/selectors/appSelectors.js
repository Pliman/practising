import marked from 'marked';
import { createSelector } from 'reselect';

const headerSelector = state => state.header;
const starsSelector = state => state.stars;
const readmeSelector = state => state.readme;
const userSelector = state => state.user;

const filteredStarsSelector = createSelector([
  starsSelector,
  headerSelector,
], (stars, header) => {
  const keyword = header.keyword;
  let ret = stars.data;
  if (keyword) {
    ret = ret.filter(item => {
      return item.name.indexOf(keyword) > -1 ||
        (item.description && item.description.indexOf(keyword) > -1);
    });
  } else {
    ret = ret.slice(0, 100);
  }
  return ret;
});

const detailSelector = createSelector([
  starsSelector,
  readmeSelector,
], (stars, _readme) => {
  const { data, selectedStarId } = stars;
  const star = data.filter(item => item.id === selectedStarId)[0];

  let repo;
  if (star) {
    const { name, owner } = star;
    repo = `${owner.login}/${name}`;
  }

  let readme;
  if (repo && _readme[repo]) {
    // Fix encode. Ref: http://blog.sqrtthree.com/2015/08/29/utf8-to-b64/
    readme = marked(decodeURIComponent(escape(atob(_readme[repo]))));
  }

  return { readme, repo };
});

export default createSelector([
  starsSelector,
  readmeSelector,
  userSelector,
  filteredStarsSelector,
  detailSelector,
], (stars, readme, user, filteredStars, detail) => {
  return {
    stars,
    readme,
    user,
    filteredStars,
    detail,
  };
});
