export function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '...' : str;
}

export function formatDate(str) {
  const date = new Date(str);
  const diffMs = new Date() - date;
  const diffMin = Math.round(diffMs / 1000 / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffWeek = Math.round(diffDay / 7);
  const diffMonth = Math.round(diffWeek / 4);
  const diffYear = Math.round(diffMonth / 12);

  if (diffMin < 60) {
    return '방금 전';
  } else if (diffHour < 24) {
    return `${diffHour}시간 전`;
  } else if (diffDay < 14) {
    return `${diffDay}일 전`;
  } else if (diffWeek < 4) {
    return `${diffWeek}주 전`;
  } else if (diffMonth < 12) {
    return `${diffMonth}개월 전`;
  } else {
    return `${diffYear}년 전`;
  }
}

export function formatNumber(num) {
  let formatted = num;
  if (num < 1000) {
    return num;
  } else if (num < 10000) {
    formatted = num / 1000;
    return `${
      Number.isInteger(formatted) ? formatted : formatted.toFixed(1)
    }천`;
  } else if (num < 100000000) {
    formatted = num / 10000;
    return `${
      Number.isInteger(formatted) ? formatted : formatted.toFixed(1)
    }만`;
  } else {
    formatted = num / 100000000;
    return `${
      Number.isInteger(formatted) ? formatted : formatted.toFixed(1)
    }억`;
  }
}
