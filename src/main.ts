import 'reflect-metadata'
import { container } from 'tsyringe'
import { Kernel } from './kernel'

container.resolve(Kernel).waitInput()
