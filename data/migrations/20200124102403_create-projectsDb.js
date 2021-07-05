
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl=>{
      tbl.increments('id');
      tbl.string('projectName')
        .notNullable();
      tbl.text('projectDescription')
      tbl.boolean('completed')
        .notNullable()
        .defaultTo(false);
  })
  
  .createTable('resources', tbl => {
      tbl.increments('id');
      tbl.string('resourceName')
        .notNullable()
        .unique();
      tbl.text('resourceDescription');  
  })

  .createTable('projects_resources', tbl => {
      tbl.increments('id');
      tbl.integer('projectKey')
        .unsigned()
        .notNullable()
        .references('id').inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.integer('resourceKey')
        .unsigned()
        .notNullable()
        .references('id').inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
  })

  .createTable('tasks', tbl =>{
      tbl.increments('id');
      tbl.integer('projectKey')
        .unsigned()
        .notNullable()
        .references('id').inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.text('taskDescription')
        .notNullable();
      tbl.text('notes');
      tbl.boolean('completed')
        .notNullable()
        .defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks')
    .dropTableIfExists('projects_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
