
module.exports = {
  updateQuicklinks: function(data) {
    return data.filter(bookmark => {
      if(bookmark.isQuicklink) {
        return {
          category: bookmark.category,
          sites: bookmark.sites
        };
      }
    })
  },
  updateBookmarks: function(data) {
    return data.filter(bookmark => {
      if(!bookmark.isQuicklink) {
        return {
          category: bookmark.category,
          subjects: bookmark.subjects
        };
      }
    })
  },
  displayContent: function(data, category) {
    if (data.length < 1) { return []; }
    for (var i = 0; i < data.length; i++) {
      if (data[i].category === category) {
        if (data[i].isQuicklink) {
          return data[i].sites.map(site => ( site.title ))
        } else {
          return data[i].subjects.map(subject => ( subject.subject ))
        }
      }
    }
  }
};