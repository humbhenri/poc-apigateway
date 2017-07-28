var fs = require('fs');
var tudo = JSON.parse(fs.readFileSync('curso.json', 'utf8'));
var statements = [];
var requisitos_statements = [];
var ids_disciplinas = [];
tudo.disciplinas.forEach(obj => {
    ids_disciplinas.push(obj.id.trim());
    statements.push(`
INSERT INTO poc.disciplinas(id, nome, creditos, aulas, laboratorios, estagios) 
VALUES ('${obj.id}', '${obj.nome}', ${obj.creditos}, ${obj.aulas}, ${obj.laboratorios}, ${obj.estagio});
`);
    var requisitos = obj.requisitos.filter(r => r.trim().length > 0);
    requisitos.forEach(function (requisito) {
        requisitos_statements.push({id: requisito, sql:`INSERT INTO poc.disciplinas_requisitos (id_disciplina, id_requisito)
    VALUES ('${obj.id}', '${requisito}');
    `});
    }, this);
});
statements.forEach(s => console.log(s));
requisitos_statements.filter(obj => ids_disciplinas.indexOf(obj.id) > 0).forEach(obj => console.log(obj.sql));