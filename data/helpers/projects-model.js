const db = require('../dbConfig')
module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    getAllResources,
    
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


function addResource(resource){
    return db('resources').insert(resource)
}

function addProjectResource(projectId, resourceId){
    if(projectId && resourceId){
        return db('projects_resources')
            .join('projects', 'projectKey', 'projects.id')
            .where('projectKey', projectId)
            .join('resources', 'resourceKey', 'resources.id')
            .where('resourceKey', resourceId)
    } else {
        return null;
    }
}

function getProjectTasks(id){
    return db.select('tasks.id', 'projects.projectName', 'projects.projectDescription', 'tasks.taskDescription', 'tasks.notes')
        .from('tasks')
        .join('projects', 'tasks.projectKey', 'projects.id')
        .where('projectKey', id)
}

function addTask(task){
    return db('tasks').insert(task)
}

