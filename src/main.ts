import dotenv, { DotenvParseOutput } from 'dotenv'

const dpo = dotenv.config().parsed as DotenvParseOutput
console.log(dpo.DEBUG)
