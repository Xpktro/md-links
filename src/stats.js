const stats = links => {
  const linkStats = links.reduce((result, link) => (
    {
      unique: result.unique.concat(!~result.unique.indexOf(link.href) ? [link.href] : []),
      broken: result.broken.concat((link.ok !== undefined && !link.ok) ? [link] : [])
    }
  ), { unique: [], broken: [] });
  return {
    total: links.length,
    unique: linkStats.unique.length,
    broken: linkStats.broken.length
  };
};

export default stats;
