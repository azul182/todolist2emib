// importar o mongoose
const mongoose = require('mongoose')

//criar estrutura para o armazenamento das informações do atividades
const modelo = mongoose.Schema({
    data:Date,
    tipo:String,
    materia:String,
    entrega: String,
    instrucoes:String,
    usuario:String,
    status:{type:Number,default:0}
})

//gravar a estrutura na model atividades
const atividades = mongoose.model('atividades',modelo)

//exportar os dados para o acesso externo
module.exports = atividades