export const translatePlayerName = nameText => {
  const parts = nameText.split(' ');

  if (parts.length === 2) {
    return `${parts[1]}, ${parts[0]}`;
  } else if(parts.length > 2) {
    const first = parts[0];
    const last = parts.slice(1).join(' ');

    return `${last}, ${first}`;
  }
};