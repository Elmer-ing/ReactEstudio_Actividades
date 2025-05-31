import config from './vite.config.js'
import { describe, it, expect } from 'vitest'

// vite.config.test.js

describe('Vite Config', () => {
  it('should export an object', () => {
    expect(typeof config).toBe('object')
  })

  it('should include react plugin', () => {
    const pluginNames = config.plugins.map(p => p && (p.name || p().name))
    expect(pluginNames).toContain('vite:react-babel')
  })

  it('should have test configuration', () => {
    expect(config.test).toBeDefined()
    expect(config.test.environment).toBe('jsdom')
    expect(config.test.globals).toBe(true)
    expect(config.test.setupFiles).toBe('./src/setupTests.js')
  })
})