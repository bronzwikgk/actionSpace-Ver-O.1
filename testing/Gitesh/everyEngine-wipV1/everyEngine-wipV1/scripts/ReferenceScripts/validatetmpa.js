

class Fact {
  /**
   * Returns a new fact instance
   * @param  {string} id - fact unique identifer
   * @param  {object} options
   * @param  {boolean} options.cache - whether to cache the fact's value for future rules
   * @param  {primitive|function} valueOrMethod - constant primitive, or method to call when computing the fact's value
   * @return {Fact}
   */
  constructor (id, valueOrMethod, options) {
    this.id = id
    const defaultOptions = { cache: true }
    if (typeof options === 'undefined') {
      options = defaultOptions
    }
    if (typeof valueOrMethod !== 'function') {
      this.value = valueOrMethod
      this.type = this.constructor.CONSTANT
    } else {
      this.calculationMethod = valueOrMethod
      this.type = this.constructor.DYNAMIC
    }

    if (!this.id) throw new Error('factId required')

    this.priority = parseInt(options.priority || 1, 10)
    this.options = Object.assign({}, defaultOptions, options)
    this.cacheKeyMethod = this.defaultCacheKeys
    return this
  }

  isConstant () {
    return this.type === this.constructor.CONSTANT
  }

  isDynamic () {
    return this.type === this.constructor.DYNAMIC
  }

  /**
   * Return the fact value, based on provided parameters
   * @param  {object} params
   * @param  {Almanac} almanac
   * @return {any} calculation method results
   */
  calculate (params, almanac) {
    // if constant fact w/set value, return immediately
    if (Object.prototype.hasOwnProperty.call(this, 'value')) {
      return this.value
    }
    return this.calculationMethod(params, almanac)
  }

  /**
   * Return a cache key (MD5 string) based on parameters
   * @param  {object} obj - properties to generate a hash key from
   * @return {string} MD5 string based on the hash'd object
   */
  static hashFromObject (obj) {
    return hash(obj)
  }

  /**
   * Default properties to use when caching a fact
   * Assumes every fact is a pure function, whose computed value will only
   * change when input params are modified
   * @param  {string} id - fact unique identifer
   * @param  {object} params - parameters passed to fact calcution method
   * @return {object} id + params
   */
  defaultCacheKeys (id, params) {
    return { params, id }
  }

  /**
   * Generates the fact's cache key(MD5 string)
   * Returns nothing if the fact's caching has been disabled
   * @param  {object} params - parameters that would be passed to the computation method
   * @return {string} cache key
   */
  getCacheKey (params) {
    if (this.options.cache === true) {
      const cacheProperties = this.cacheKeyMethod(this.id, params)
      const hash = Fact.hashFromObject(cacheProperties)
      return hash
    }
  }
}




export default class Operator {
  /**
   * Constructor
   * @param {string}   name - operator identifier
   * @param {function(factValue, jsonValue)} callback - operator evaluation method
   * @param {function}  [factValueValidator] - optional validator for asserting the data type of the fact
   * @returns {Operator} - instance
   */
  constructor (name, cb, factValueValidator) {
    this.name = String(name)
    if (!name) throw new Error('Missing operator name')
    if (typeof cb !== 'function') throw new Error('Missing operator callback')
    this.cb = cb
    this.factValueValidator = factValueValidator
    if (!this.factValueValidator) this.factValueValidator = () => true
  }

  /**
   * Takes the fact result and compares it to the condition 'value', using the callback
   * @param   {mixed} factValue - fact result
   * @param   {mixed} jsonValue - "value" property of the condition
   * @returns {Boolean} - whether the values pass the operator test
   */
  evaluate (factValue, jsonValue) {
    return this.factValueValidator(factValue) && this.cb(factValue, jsonValue)
  }
}

/**
   * Constructor
   * @param {string}   name - operator identifier
   * @param {function(factValue, jsonValue)} callback - operator evaluation method
   * @param {function}  [factValueValidator] - optional validator for asserting the data type of the fact
   * @returns {Operator} - instance
   */

