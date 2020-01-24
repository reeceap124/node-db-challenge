
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl=>{
      tbl.increments('id');
      tbl.string('projectName')
        .notnullable()
      tbl.text('projectDescription')
      tbl.boolean('completed')
        .notnullable()
        .defaultTo(false)
  })
  
  .createTable('resources', tbl => {
      tbl.increments('id');
      tbl.string('resourceName')
        .notnullable()
        .unique();
      tbl.text('resourceDescription');  
  })

  .createTable('projects_resources', tbl => {
      tbl.increments('id');
      tbl.integer('projectKey')
        .unsigned()
        .notnullable()
        .references('id').inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.integer('resourceKey')
        .unsigned()
        .notnullable()
        .references('id').inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
  })

  .createTable('tasks', tbl =>{
      tbl.increments('id');
      tbl.integer('projectKey')
        .unsigned()
        .notnullable()
        .references('id').inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.text('taskDescription')
        .notnullable();
      tbl.text('notes');
      tbl.boolean('completed')
        .notnullable()
        .defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks')
    .dropTableIfExists('projects_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
