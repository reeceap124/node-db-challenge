
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, projectName: 'Build Project DB', projectDescription: 'complete this weeks challenge by building a projects database with data access'},
        {id: 2, projectName: 'Clean Dishes', projectDescription: 'Figure it out'},
        {id: 3, projectName: 'Be Awesome'}
      ]);
    });
};
