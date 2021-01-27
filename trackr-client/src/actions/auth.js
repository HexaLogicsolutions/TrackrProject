import axios from 'axios'

// Headers
const config = {
    headers : {
        'Content-Type' : 'application/json'
        }
}

// Login the user in

export const login = (data, callback) => {
    
    const { code, password, token } = data;
    
    // Request body
    const body = JSON.stringify({ code, password, token})

    axios
        .post('/api/auth', body, config)
        .then(res => {
            if(res.data.success){ 
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback === "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

// Register new User

export const addUser = (user, callback) => {

    const {code, name, password, email, group,active} = user;

    //Request body
    const body = JSON.stringify({code, name, password, email, group,active})

    axios
        .post('/api/users', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addEntity = (entity, callback) => {

    const {code, extcode,epc,desc,serial,material,type,subtype,brand,status,location,weight,purity,lastseen,duration} = entity;

    //Request body
    const body = JSON.stringify({code, extcode,epc,desc,serial,material,type,subtype,brand,weight,purity,status,location,lastseen,duration})

    axios
        .post('/api/entity', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addActionGroup= (actiongroup, callback) => {

    const {code,name,material, enabled,entitytype,entitysubtype,warehouse,locationarea,location,status,entitycount } = actiongroup;

    //Request body
    const body = JSON.stringify({code,name,material,entitytype,entitysubtype,warehouse,locationarea,location,status,enabled,entitycount})

    axios
        .post('/api/actiongroup', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateActionGroup= (actiongroup, callback) => {

    const {code,name,material, enabled,entitytype,entitysubtype,warehouse,locationarea,location,status,entitycount } = actiongroup;

    //Request body
    const body = JSON.stringify({code,name,material,entitytype,entitysubtype,warehouse,locationarea,location,status,enabled,entitycount})

    axios
        .put('/api/actiongroup', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addEntitySubType = (entitysubtype, callback) => {

    const {code, name,type,active} = entitysubtype;

    //Request body
    const body = JSON.stringify({code, name,type,active})

    axios
        .post('/api/entitysubtype', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addLocationArea = (locationarea, callback) => {

    const {code, name,type,active} = locationarea;

    //Request body
    const body = JSON.stringify({code, name,type,active})

    axios
        .post('/api/locationarea', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addLocation = (location, callback) => {

    const {code, name,type,area,enable} = location;

    //Request body
    const body = JSON.stringify({code, name,type,area,enable})

    axios
        .post('/api/location', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addGroup = (group, callback) => {

    const {code, name, enabled} = group;

    //Request body
    const body = JSON.stringify({code, name, enabled})

    axios
        .post('/api/groups', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addStatus = (status, callback) => {

    const {code, desc, enabled} = status;

    //Request body
    const body = JSON.stringify({code, desc, enabled})

    axios
        .post('/api/entitystatus', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addEntityType = (entity, callback) => {

    const {code, extcode,epc,name,type,subtype,brand,status,location,lastseen,duration} = entity;

    //Request body
    const body = JSON.stringify({code, extcode,epc,name,type,subtype,brand,status,location,lastseen,duration})

    axios
        .post('/api/entity', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const addWarehouse = (loc, callback) => {

    const {code, name, active} = loc;

    //Request body
    const body = JSON.stringify({code, name, active})

    axios
        .post('/api/warehouse', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateUser = (user, callback) => {

    const {code, name, email, group, active} = user;

    //Request body
    const body = JSON.stringify({code, name, email, group, active})

    axios
        .put('/api/users', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateEntity = (entity, callback) => {

    const {code, extcode,epc,desc,serial, material,type,subtype,brand,status,location,weight,purity,lastseen,duration} = entity;

    //Request body
    const body = JSON.stringify({code, extcode,epc,desc,serial,material,type,subtype,brand,weight,purity,status,location,lastseen,duration})

    axios
        .put('/api/entity', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateEntitySubType = (newentitysubtype, callback) => {

    const {code, name, type, active} = newentitysubtype;

    //Request body
    const body = JSON.stringify({code, name, type, active})

    axios
        .put('/api/entitysubtype', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateLocationArea = (newlocationarea, callback) => {

    const {code, name, type, active} = newlocationarea;

    //Request body
    const body = JSON.stringify({code, name, type, active})

    axios
        .put('/api/locationarea', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateLocation = (newlocation, callback) => {

    const {code, name, type, area,enable} = newlocation;

    //Request body
    const body = JSON.stringify({code, name, type, area,enable})

    axios
        .put('/api/location', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateEntityType = (entity, callback) => {

    const {code, name, active} = entity;

    //Request body
    const body = JSON.stringify({code, name,  active})

    axios
        .put('/api/entitytype', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateWarehouse = (location, callback) => {

    const {code, name, active} = location;

    //Request body
    const body = JSON.stringify({code, name,  active})

    axios
        .put('/api/warehouse', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}


export const updateGroup = (Group, callback) => {

    const {code, name, enabled} = Group;

    //Request body
    const body = JSON.stringify({code, name, enabled})

    axios
        .put('/api/groups', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}

export const updateStatus = (Status, callback) => {

    const {code, desc, enabled} = Status;

    console.log("Code" +code);
    console.log("Desc"+desc);
    console.log("Enabled"+enabled);

    //Request body
    const body = JSON.stringify({code, desc, enabled})

    axios
        .put('/api/entitystatus', body, config)
        .then(res => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token)
            }

            if(typeof callback == "function"){
                callback(res)
            }
        })
        .catch(err => console.log(err))
}