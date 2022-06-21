const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{
    //criar a rota para renderizar a view atividades
    app.get('/atividades',async(req,res)=>{
        // capturar o id da barra de endereço
        var id= req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})
        //buscar todas as atividades desse usuario
        var abertas = await atividades.find({usuario:id,status:0}).sort({data:1})
        //buscar todas as atividades desse usuario
        var entregues = await atividades.find({usuario:id,status:1}).sort({data:1})
        //buscar todas as atividades desse usuario
        var excluidas = await atividades.find({usuario:id,status:2}).sort({data:1})


        //console.log(buscar)
        //res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
        //abri a view accordion
        //res.render('accordion.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
        res.render('atividades2.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
    })

    //gravar as informações do formulário na colection atividades
    app.post('/atividades',async(req,res)=>{
        //recuperando as informações digitadas
        var dados = req.body
        //conectar com o banco de dados
        const conexao = require('../config/database')()
        //model atividades
        const atividades = require('../models/atividades')
        //salvar as informações do formulario njo database
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            materia:dados.materia,
            instrucoes:dados.orientacao,
            usuario:dados.id
        }).save()
        //redirecionar para a rota atividades
        res.redirect('/atividades?id='+dados.id)
    })

    //Excluir atividades
    app.get("/excluir",async(req,res)=>{
        //recuperar o parametro id da barra de indereço
        var id = req.query.id
        //var excluir = await atividades.findOneAndRemove({_id:id})
        var excluir = await atividades.findOneAndUpdate(
            {_id:id},
            {status:2}
        )
        res.redirect('/atividades?id='+excluir.usuario)
    })

    //entrega atividades
    app.get("/entregue",async(req,res)=>{
        //recuperar o parametro id da barra de indereço
        var id = req.query.id
        var entregue = await atividades.findOneAndUpdate(
            {_id:id},
            {status:1}
        )
        res.redirect('/atividades?id='+entregue.usuario)
    })

        //desfazer atividades
        app.get("/desfazer",async(req,res)=>{
            //recuperar o parametro id da barra de indereço
            var id = req.query.id
            var desfazer = await atividades.findOneAndUpdate(
                {_id:id},
                {status:0}
            )
            res.redirect('/atividades?id='+desfazer.usuario)
        })
    //Aniquilar atividades
    app.get("/aniquilar",async(req,res)=>{
        //recuperar o parametro id da barra de indereço
        var id = req.query.id
        var aniquilar = await atividades.findOneAndRemove({_id:id})
        res.redirect('/atividades?id='+aniquilar.usuario)
    })
    //criar a rota para renderizar a view alterar
    app.get('/alterar',async(req,res)=>{
        // capturar o id(atividade) da barra de endereço
        var id= req.query.id
        //buscar a atividade que será alterada
        var alterar = await atividades.findOne({_id:id})
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:alterar.usuario})
    
        res.render('alterar.ejs',{nome:user.nome,id:user._id,dados:alterar})
    })
}