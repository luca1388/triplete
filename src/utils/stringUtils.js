const getHostName = url => {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return null;
  }
};

const slugify = string =>
  string
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, "-") // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ""); // remove leading, trailing -

exports.getHostName = getHostName;
exports.slugify = slugify;
