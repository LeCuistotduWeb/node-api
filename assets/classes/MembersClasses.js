let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return Members
}

let Members = class {
    constructor(db) {}

    static getAll(max){
        return new Promise((next)=> {
            if(typeof max != "undefined" && max > 0) {
                db.query('SELECT * FROM members LIMIT 0, ?', [parseInt(max)])
                    .then(result => next(result))
                    .catch(err => next(new Error(err)))
            }
            else if (typeof max != 'undefined') {
                next(new Error(config.errors.wrongMaxValue))
            }
            else {
                db.query('SELECT * FROM members')
                    .then(result => next(result))
                    .catch(err => next(new Error(err)))
            }
        })
    }

    static getById(id){
        return new Promise((next)=> {
            db.query('SELECT * FROM members WHERE id = ?', [id])
                .then(result => {
                    if (typeof result[0] !== 'undefined') {
                        next(result[0])
                    } else {
                        next(new Error(config.errors.wrongId))
                    }
                }).catch(err => next(new Error(err)))
        })
    }

    static add(name){
        return new Promise((next)=> {
            if(name && name.trim() !== ''){
                name = name.trim()
                db.query('SELECT * FROM members WHERE name = ?', [name])
                    .then( result => {
                        if(typeof result[0] !== 'undefined'){
                            next(new Error(config.errors.nameAlreadyTaken))}
                        else {
                            return db.query('INSERT INTO members(name) VALUES (?)', [name])
                        }
                    }).then(result => {
                    next({id: result.insertId, name: name,})
                }).catch(err => {next(new Error(err))})
            }
        })
    }

    static update(id ,name){
        return new Promise((next)=> {
            if(name && name.trim() !== ''){
                name = name.trim()
                    db.query('SELECT * FROM members WHERE id = ?', [id])
                        .then(result => {
                            if(typeof result[0] != 'undefined'){
                                return db.query('SELECT * FROM members WHERE name = ? AND id != ?', [name, id])
                            }
                            else {next(new Error(config.errors.wrongId))}
                        })
                        .then(result => {
                            if(typeof result[0] !== "undefined"){
                                next(new Error(config.errors.sameName))
                            } else {
                                return db.query('UPDATE members SET name = ? WHERE id = ?', [name, id])
                            }})
                        .then(() => next(true))
                        .catch(err => {next(new Error(err))})
            }else {next(error('No name value'))}
        })
    }

    static delete(id){
        return new Promise((next)=> {
            db.query('SELECT * FROM members WHERE id = ?', [id])
                .then(result => {
                    if(typeof result[0] !== 'undefined'){
                        return db.query('DELETE FROM members WHERE id = ?', [id])
                    }else {
                        next(new Error(config.errors.wrongId))
                    }
                })
                .then(() => {next(true)})
                .catch(err => next(new Error(err)))
        })
    }

}