export const getHumanReadableSize = size => {
    const sizes = ['B', 'kB','MB','GB','TB','PB','EB','ZB','YB'];
    let index = 0;

    while (size >= 1024) {
        size = size / 1024;
        index++;
    }

    const rounded = Math.round(size * 100) / 100;

    return `${rounded} ${sizes[index]}`;
}

export const parseQueryString = queryString => {
  const pairs = queryString.split('&');
  return pairs.reduce((memo, next) => {
    const keyAndValue = next.split('=');
    memo[keyAndValue[0]] = keyAndValue[1];
    return memo;
  },{})
}