const router = require('express').Router();
const Projects = require('../data/helpers/projects-model');

router.get('/projects', (req, res) => {
    Projects.getAllProjects()
        .then(projects=>{
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed' });
          });
})

router.get('/projects/:id', (req, res)=>{
    Projects.getProjectById(req.params.id)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed' });
        });
})

router.get('/projects/:id/tasks', (req, res)=>{
    Projects.getProjectTasks(req.params.id)
        .then(tasks=>{
            res.status(200).json(tasks)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed' });
        });
})

router.get('/projects/:id/resources', (req,res)=>{
    Projects.getProjectResources(req.params.id)
        .then(resources=>{
            res.status(200).json(resources)
        })
        .catch(()=>{
            res.status(500).json({message: 'Failed'});
        })
})

router.get('/resources', (req, res)=>{
    Projects.getAllResources()
        .then(resources=>{
            res.status(200).json(resources)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed' });
        });
})

// BEGIN POST METHODS

router.post('/projects', (req, res)=>{
    Projects.addProject(req.body)
        .then(project=>{
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed' });
        });
})

router.post('/projects/:id/resources', (req, res)=>{
    Projects.addProjectResource(req.params.id, req.body)
        .then(resource=>{
            res.status(201).json(resource)
        })
        .catch(()=>{
            res.status(500).json({message: 'Failed'})
        })
})

router.post('/resources', (req, res)=>{
    Projects.addResource(req.body)
        .then(resource=>{
            res.status(201).json(resource)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed' });
        });
})

router.post('/projects/:id/tasks', (req, res)=>{
    Projects.addTask(req.params.id, req.body)
        .then(project=>{
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed' });
        });
})


module.exports = router;