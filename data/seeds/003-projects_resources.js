
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects_resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects_resources').insert([
        {id: 1, projectKey: 1, resourceKey:1},
        {id: 2, projectKey: 1, resourceKey:2},
        {id: 3, projectKey: 1, resourceKey:3},
        {id: 4, projectKey: 2, resourceKey:4},
        {id: 5, projectKey: 2, resourceKey:5},
        {id: 6, projectKey: 2, resourceKey:6},
        {id: 7, projectKey: 2, resourceKey:7}
      ]);
    });
};
