import { languageColors } from 'utils';

export const getTopRepos = (repos, sortType, limit) => {
    const map = {
        stars: 'stargazers_count',
        forks: 'forks_count',
        size: 'size',
    };
    const sortProperty = map[sortType];
    return repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, limit);
};

export const getTotalStars = repos =>
    Intl.NumberFormat().format(
        repos.filter(repo => !repo.fork).reduce((acc, repo) => acc + repo.stargazers_count, 0)
    );

export const getLanguageData = repos => {
    const languageData = [];
    const languageColorsKeys = Object.keys(languageColors);
    const languageColorsValues = Object.values(languageColors);

    repos
        .filter(repo => {
            if (!repo.language || repo.fork) {
                return false;
            }
            return true;
        })
        .forEach(repo => {
            const { language } = repo;
            const languageObj = languageData.find(el => el.language === language);

            if (languageObj) {
                const index = languageData.indexOf(languageObj);
                languageData[index] = {
                    ...languageObj,
                    count: languageObj.count + 1,
                    stars: languageObj.stars + repo.stargazers_count,
                };
            } else {
                languageData.push({
                    language,
                    count: 1,
                    stars: repo.stargazers_count,
                    color:
                        languageColorsValues[languageColorsKeys.findIndex(el => el === language)],
                });
            }
        });
    return languageData;
};
