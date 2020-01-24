
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, projectKey: 1, taskDescription: 'Drink coffee', notes: 'essential to make this the first task'},
        {id: 2, projectKey: 1, taskDescription: 'Sit at computer'},
        {id: 3, projectKey: 1, taskDescription: 'Perform code magic', notes: '"DO IT! JUST DO IT!" -Shia Lebeouf'},
        {id: 4, projectKey: 2, taskDescription: 'combine water and soap'},
        {id: 5, projectKey: 2, taskDescription: 'clean dish', notes: 'wet dish is soapy water, and use scrubber to dislodge food remnants.'},
        {id: 6, projectKey: 2, taskDescription: 'dry', notes: 'place cleaned dish on drying rack'}
      ]);
    });
};
