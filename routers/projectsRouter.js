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
    const id = req.params.id
    Projects.getProjectById(id)
        .then(project=>{
            Projects.getProjectTasks(id)
                .then(tasks => {
                    Projects.getProjectResources(id)
                        .then(resources=>{
                            let taskArray = []
                            let resourceArray = []
                            if(tasks.length){
                                taskArray = [tasks]
                            }
                            if(resources.length){
                                resourceArray = [resources]
                            }
                            res.status(200).json({...project[0], taskList: taskArray, resourceList: resourceArray})
                        })
                })
            
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


//checks if resource exists, and if not adds it to resources
router.post('/projects/:id/resources', (req, res)=>{
    const id = req.params.id
    const resource = req.body
    //request to find any resources by the given resourceName
    Projects.getResourceByName(resource)
        .then(availResource=>{
            //if one is found (i.e. .length > 0) then adds project resource
            if (availResource.length > 0) {
                Projects.addProjectResource(id, availResource)
                    .then(added=>{
                        res.status(201).json(added)
                    })
                    .catch(()=>{
                        res.status(500).json({error: 'Failed to add resource From name'})
                    })
              //if length is not greater than 0 then adds resource and adds to project resource  
            }  else {
                Projects.addResource(resource)
                    .then(addedId=>{
                        //only id is returned in addResource, so need to get the whole resource. may want to change in future iteration of model
                        Projects.getResourceById(addedId[0])
                            .then(addedR=>{
                                Projects.addProjectResource(id, addedR)
                                    //adding resource here
                                    .then(newPR=>{
                                        res.status(201).json(newPR)
                                    })
                                    .catch(()=>{
                                        res.status(500).json({error: 'Failed to add from newly created Resource'})
                                    })
                            })
                            .catch(()=>{
                                res.status(500).json({error: 'Failed to get resource by Id'})
                            })
                        
                    })
                    .catch(()=>{
                        res.status(500).json({error: 'Failed to create new resouce'})
                    })
            }
        })
        .catch(()=>{
            res.status(500).json({error: 'Failed'})
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