export const getIdFromPath = (url: URL | undefined) => {
  if (url == undefined) return;
  const parts = url.href.split("/");

  // https://swapi.dev/api/people/6/ like url expected (here length - 1 is "" and length - 2 is 6)
  return parts[parts.length - 2];
};
