const express = require('express');
const router = express.Router();

const { Evento, Participante, Inscricao } = require('../models');
const { create } = require('xmlbuilder2');

/**
 * @swagger
 * /exportar/eventos/xml:
 *   get:
 *     summary: Exporta eventos em XML
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Lista de eventos em XML
 */

// GET /exportar/eventos/xml
router.get('/eventos/xml', async (req, res, next) => {
    try {
        const eventos = await Evento.findAll({
            order: [['data', 'ASC']],
        });

        const xml = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('eventos');

        eventos.forEach(evento => {
            xml.ele('evento')
                .ele('id').txt(String(evento.id)).up()
                .ele('nome').txt(evento.nome).up()
                .ele('descricao').txt(evento.descricao || '').up()
                .ele('data').txt(evento.data.toISOString()).up()
                .ele('local').txt(evento.local || '').up()
                .ele('capacidade').txt(String(evento.capacidade || 0)).up()
                .up();
        });

        const xmlString = xml.end({ prettyPrint: true });

        res.set('Content-Type', 'application/xml');
        res.send(xmlString);

    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /exportar/eventos/json:
 *   get:
 *     summary: Exporta eventos em JSON
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Download do arquivo JSON
 */

// GET /exportar/eventos/json
router.get('/eventos/json', async (req, res, next) => {
    try {
        const eventos = await Evento.findAll({
            order: [['data', 'ASC']],
            raw: true,
        });

        res.set('Content-Type', 'application/json');
        res.set('Content-Disposition', 'attachment; filename="eventos.json"');

        res.json(eventos);

    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /exportar/relatorio/inscricoes:
 *   get:
 *     summary: Relatório de inscrições por evento
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: Relatório completo das inscrições
 */

// GET /exportar/relatorio/inscricoes
router.get('/relatorio/inscricoes', async (req, res, next) => {
    try {
        const eventos = await Evento.findAll({
            include: [{
                model: Inscricao,
                as: 'inscricoes',
                include: [{
                    model: Participante,
                    as: 'participante',
                    attributes: ['nome', 'email'],
                }],
            }],
            order: [['data', 'ASC']],
        });

        const relatorio = eventos.map(evento => ({
            evento: evento.nome,
            data: evento.data,
            capacidade: evento.capacidade,
            totalInscritos: evento.inscricoes.length,
            vagasRestantes: (evento.capacidade || 0) - evento.inscricoes.length,
            inscritos: evento.inscricoes.map(i => ({
                nome: i.participante.nome,
                email: i.participante.email,
                status: i.status,
                dataInscricao: i.dataInscricao,
            })),
        }));

        res.json({
            geradoEm: new Date().toISOString(),
            totalEventos: relatorio.length,
            relatorio,
        });

    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /exportar/relatorio/inscricoes/csv:
 *   get:
 *     summary: Exporta relatório de inscrições em CSV
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: Download do arquivo CSV
 */

// GET /exportar/relatorio/inscricoes/csv
router.get('/relatorio/inscricoes/csv', async (req, res, next) => {
    try {
        const inscricoes = await Inscricao.findAll({
            include: [
                {
                    model: Evento,
                    as: 'evento',
                    attributes: ['nome', 'data'],
                },
                {
                    model: Participante,
                    as: 'participante',
                    attributes: ['nome', 'email'],
                },
            ],
            raw: true,
            nest: true,
        });

        let csv = 'ID,Evento,Data Evento,Participante,Email,Status,Data Inscricao\n';

        inscricoes.forEach(i => {
            csv += `${i.id},${i.evento.nome},${i.evento.data},${i.participante.nome},${i.participante.email},${i.status},${i.dataInscricao}\n`;
        });

        res.set('Content-Type', 'text/csv');
        res.set('Content-Disposition', 'attachment; filename="inscricoes.csv"');

        res.send(csv);

    } catch (erro) {
        next(erro);
    }
});

module.exports = router;