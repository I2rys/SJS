//Dependencies
const AST = require("abstract-syntax-tree")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    process.exit()
}

if(Self_Args[0].indexOf("sjs") != -1){
    var file_data = Fs.readFileSync(Self_Args[0], "utf8")

    file_data = file_data.replace(/gvar/g, "const")
    file_data = file_data.replace(/(?<!")func\s(?!")/g, "function ")

    const file_data_codes = Fs.readFileSync(Self_Args[0], "utf8").split("\n")
    const file_data_tree = AST.parse(file_data)

    AST.replace(file_data_tree, node =>{
        if(node.type == "MemberExpression"){
            if(node.property.name == "print"){
                node.property.name = "log"
            }
        }

        return node
    })

    eval(AST.generate(file_data_tree))
}else{
    console.log("Invalid filetype, make sure the file extension is sjs.")
    process.exit()
}
