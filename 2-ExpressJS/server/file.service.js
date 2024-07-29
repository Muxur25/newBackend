
const {v4: uuidv4} = require('uuid')

const fs = require('fs')

const path = require('path')



class FileService{
	save(file){
		try {
			const hozir = __dirname
			const rasm = uuidv4() + '.jpg'
			const pathStatic = path.join(hozir, '..', 'static')
			const filePath = path.join(pathStatic, rasm)
			
			if (!fs.existsSync(pathStatic)){
				fs.mkdirSync(pathStatic, {recursive:true})
			}
			
			file.mv(filePath)
			
			return rasm
		}catch (e) {
			throw new Error("File systems error" + e)
		}
	}
}

module.exports = new FileService()