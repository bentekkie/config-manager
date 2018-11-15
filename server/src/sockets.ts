import IO from 'socket.io'
import path from 'path'
import fs from 'fs'
import ini from 'ini'
import mime from 'mime-types'


export class Sockets {
    readonly io : IO.Server

    constructor(server : any,configLocation : string){
        this.io = IO(server)
        this.io.on('connection', socket => {
            socket.on('get file', path => {
                let pathArr = path.split('/')
                let type = mime.lookup(pathArr[pathArr.length-1])
                fs.readFile(path, 'utf8', function(err, contents) {
                    if(err){
                        return socket.emit('server_error', err)
                    }
                    socket.emit('get file complete', path, contents, type)
                });
            })
            socket.on('get language', language => {
                fs.readFile(require.resolve(`codemirror/mode/${language}/${language}`),'utf8',(err, contents) => {
                    if(err){
                        return socket.emit('server_error', err)
                    }
                    socket.emit('get language complete', language, contents)
                })
            })
            socket.on('get config', () => {
                fs.readFile(configLocation, 'utf8', (err, contents) => {
                    if(err){
                        return socket.emit('server_error', err)
                    }
                    socket.emit('config',ini.parse(contents))
                });
            })
            socket.on('reload config', () => {
                fs.readFile(configLocation, 'utf8', (err, contents) => {
                    if(err){
                        return socket.emit('server_error', err)
                    }
                    this.io.emit('config',ini.parse(contents))
                });
            })
            socket.on('set file', (path,contents) => {
                fs.writeFile(path,contents,(err) => {
                    if(err){
                        return socket.emit('server_error', err)
                    }else{
                    
                        socket.emit('set file complete')
                        if(path === configLocation){
                            this.io.emit('config',ini.parse(contents))
                        }
                    }
                })
            })
            fs.readFile(configLocation, 'utf8', (err, contents) => {
                if(err){
                    return socket.emit('server_error', err)
                }
                socket.emit('config',ini.parse(contents))
            });
            
            fs.readdir(path.resolve(require.resolve('codemirror/mode/xml/xml').split(".")[0],'..','..'),(err,files) => {
                if(err){
                    return socket.emit('server_error', err)
                }
                socket.emit('languages', files)
            })
        })
    }
}
