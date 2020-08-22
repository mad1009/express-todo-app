
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {title: "Build Crud App", priority: 1, description:"Using Knex Express and hbs",date:new Date()},
        {title: "Learn React", priority: 2, description:"Learn about classes and functions based components",date:new Date()},
        {title: "Integrate React With node express back end", priority: 3, description:"Use all what we learn to link React with Node and Express",date:new Date()},
      ]);
    });
};
