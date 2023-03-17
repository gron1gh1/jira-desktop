export const jiraRegExp = /\w+\.atlassian\.net/g;

export const validateJiraUrl = (url: string) => {
  return jiraRegExp.test(url);
};

export const getHostFromUrl = (url: string) => {
  const matches = url.match(jiraRegExp);

  if (matches) {
    return matches[0];
  }
  return "";
};

export const getPrefixFromUrl = (url: string) => {
  return getHostFromUrl(url).split(".").shift();
};
