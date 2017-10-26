process.env.NODE_ENV = 'test';

const chai = require('chai');
global.should = chai.should();
global.expect = chai.expect;

const supertest = require('supertest');
const app = require('../../index');
global.api = supertest(app);

const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
global.mongoose = mongoose;
