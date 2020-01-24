const db = require('../dbConfig')
module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    getAllResources,
    getProjectResources,
    addResource,
    addProjectResource,
    getProjectTasks,
    addTask

}

function getAllProjects(){
    return db('projects')
}

function getProjectById(id){
    if(id){
        return db('projects')
        .where({id})
    } else {
        return null;
    }
    
}

function addProject(project){
    return db('projects').insert(project)
}

function getAllResources(){
    return db('resources')
}

function getProjectResources(id){
    return db.select('pr.id', 'r.resourceName', 'p.projectName')
        .from('projects_resources as pr')
        .join('projects as p', 'pr.projectKey', 'p.id')
        .join('resources as r', 'pr.resourceKey', 'r.id')
        .where('projectKey', id)
}


function addResource(resource){
    return db('resources').insert(resource)
}

function addProjectResource(id, pr){
        const newId = parseInt(id)

        return db('projects_resources').insert({
            projectKey: newId, 
            resourceKey: (db.select('id')
                .from('resources')
                .where('resourceName', pr.resourceName)
            )
        })
        // if((db('resources').where('resourceName', pr.resourceName))) {
        //     console.log('inside if statement')
        //     return db('projects_resources').insert({
        //         projectKey: newId, 
        //         resourceKey: (db.select('id')
        //             .from('resources')
        //             .where('resourceName', pr.resourceName)
        //         )
        //     })
        // } else {
        //     console.log('inside else statement')
        //     db('resources').insert(pr)
        //     return db('projects_resources').insert({
        //         projectKey: newId, 
        //         resourceKey: (db.select('id')
        //             .from('resources')
        //             .where('resourceName', pr.resourceName)
        //         )
        //     })

        // }
        
        
}

function getProjectTasks(id){
    return db.select('tasks.id', 'tasks.taskDescription', 'tasks.notes', 'projects.projectName', 'projects.projectDescription')
        .from('tasks')
        .join('projects', 'tasks.projectKey', 'projects.id')
        .where('projectKey', id)
}

function addTask(id, task){
    const parsedId = parseInt(id)
    return db('tasks').insert({
        projectKey: parsedId,
        taskDescription: task.taskDescription,
        notes: task.notes
    })
}


// function addProjectResource(id, pr){
//     const newId = parseInt(id)

//     return db('projects_resources').insert({
//         projectKey: newId, 
//         resourceKey: (db.select('id')
//             .from('resources')
//             .where('resourceName', pr.resourceName)
//         )
//     })

