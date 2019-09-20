const axios = require('axios');
const Question = require('../models/Question');
const mongoose = require('mongoose');

module.exports = {
  async store(req, res) {
    const { question, area, answer, options } = req.body;

    const questionExists = await Question.findOne({ question: question });
    if (questionExists) {
      return res.status(200).json({ message: 'Questão já cadastrada.' });
    }

    await Question.create({
      question,
      area,
      answer,
      options
    });

    return res.status(200).json({ message: 'Questão cadastrado com sucesso' });
  },

  async questions_area(req, res) {
    const area = req.params.area;
    const questions_danger = await Question.find({ area: area });

    const questions = [];
    if (questions_danger.length > 0) {
      for (const q of questions_danger) {
        const { question, area, answer, options } = q;
        questions.push({
          question,
          answer,
          area,
          options
        });
      }
      return res.json({ questions: questions, length: questions.length });
    }
    return res.status(404).json({
      error: `Não existem questões cadastradas da área ${area} na aplicação`
    });
  },

  async questions(req, res) {
    const questions_danger = await Question.find({});

    const questions = [];
    if (questions_danger.length > 0) {
      for (const q of questions_danger) {
        const { question, area, answer, options } = q;
        questions.push({
          question,
          answer,
          area,
          options
        });
      }
      return res.json({ questions: questions, length: questions.length });
    }
    return res.status(404).json({
      error: 'Não existem questões cadastradas na aplicação'
    });
  }
};
