
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, resourceName: 'computer'},
        {id: 2, resourceName: 'coffee'},
        {id: 3, resourceName: 'code magic'},
        {id: 4, resourceName: 'water'},
        {id: 5, resourceName: 'soap'},
        {id: 6, resourceName: 'scrubber'},
        {id: 7, resourceName: 'drying rack'}
      ]);
    });
};
