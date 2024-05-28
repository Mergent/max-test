const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { jwtDecode } = require('jwt-decode');

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function paginationSort(array, params) {
  let sortContent = array;

  let sort = null;
  if (params.sort) {
    sort = params.sort.split(',')
  }

  if (sort?.[0] && sort?.[1]) {
    sortContent = array.sort((a, b) => {
      if (a[sort[0]] > b[sort[0]]) {
        return sort[1] === 'asc' ? 1 : -1;
      }
      if (a[sort[0]] < b[sort[0]]) {
        return sort[1] === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }
  const size = parseInt(params.size)
  if (size === 0) {
    return sortContent
  }

  if (params.page && params.size) {
    const page = parseInt(params.page)
    const size = parseInt(params.size)
    return sortContent.filter((e, i) => {
      return i < (page + 1) * size && i >= (page * size)
    });
  }

  return sortContent;
}

function deleteById(array, id, absolutePath) {
  const newArray = array.filter(item => item.id.toString() !== id);
  fs.writeFileSync(absolutePath, JSON.stringify(newArray, null, 2), 'utf-8')
  return newArray
}

function deleteByIds(array, ids, absolutePath) {
  const newArray = array.filter(x => !ids.includes(x.id))
  fs.writeFileSync(absolutePath, JSON.stringify(newArray, null, 2), 'utf-8')
  return newArray
}

function deleteByArchivIds(array, ids, absolutePath) {
  const newArray = array.filter(x => !ids.includes(x.archivId))
  fs.writeFileSync(absolutePath, JSON.stringify(newArray, null, 2), 'utf-8')
  return newArray
}

function createElem(array, data) {
  const elem = {
    ...data,
    id: array[array.length - 1].id + 1
  }
  array.unshift(elem)
  return elem;
}

function putElemById(array, data, id, absolutePath) {
  const index = array.findIndex(i => i.id.toString() === id)
  array[index] = data;
  fs.writeFileSync(absolutePath, JSON.stringify(array, null, 2), 'utf-8')
}

function concatElemById(array, data, id, absolutePath) {
  const index = array.findIndex(i => i.id.toString() === id)
  array[index] = { ...array[index], ...data };
  fs.writeFileSync(absolutePath, JSON.stringify(array, null, 2), 'utf-8')
  return array[index]
}

function concatElemsByIds(array, data, ids, absolutePath) {
  const newArray = array.map((elem) => {
    if (ids.includes(elem.id.toString())) {
      return { ...elem, ...data };
    }
    return elem
  })
  fs.writeFileSync(absolutePath, JSON.stringify(newArray, null, 2), 'utf-8')
  return newArray
}

function replaceElems(newArray, absolutePath) {
  fs.writeFileSync(absolutePath, JSON.stringify(newArray, null, 2), 'utf-8')
}

function putElemToCMSById(array, data, id, absolutePath) {
  const cms = array.find(cms => cms.userId === id)
  const prevUserProperties = cms.user_properties
  const newUserProperties = data.filter(
    newData => !prevUserProperties.some(
      prevUserProperty =>
        prevUserProperty.category === newData.category && prevUserProperty.key === newData.key
    )
  ).map(addIdOnElem)
  const mergedUserProperties = prevUserProperties.reduce((mergedUserProperties, userProperty) => {
    const newUserProperty = data.find(
      newData =>
        newData.category === userProperty.category && newData.key === userProperty.key
    )
    if (newUserProperty)
      return [...mergedUserProperties, { ...userProperty, ...newUserProperty }]

    return [...mergedUserProperties, userProperty]
  }, newUserProperties)
  const newArray = array.map(cms => {
    if (cms.userId === id) {
      return {
        ...cms,
        user_properties: mergedUserProperties
      }
    }
    return cms
  })
  fs.writeFileSync(absolutePath, JSON.stringify(newArray, null, 2), 'utf-8')
}

const dateToTimestamp = (str, last = true) => {
  const date = new Date(str);
  if (!last) date.setUTCHours(23, 59, 59, 999)
  return date.getTime()
}

function filterSort(array, params) {
  let filterParams = params, key;
  let filterArray = array;

  for (key in filterParams) {
    if (!key.startsWith('filter')) continue;
    if (key.split('.').length > 2) {
      const filterKey = key.split('.')[1]
      const paramsKey = key.split('.')[2]
      filterArray = filterArray.filter(elem => {
        return paramsKey === 'dateFrom' ? dateToTimestamp(filterParams[`filter.${filterKey}.dateFrom`]) <= elem[filterKey] : elem[filterKey] <= dateToTimestamp(filterParams[`filter.${filterKey}.dateTo`], false);
      })
    } else {
      const paramsKey = key.split('.')[1]
      filterArray = filterArray.filter(elem => {
        if (Array.isArray(elem[paramsKey]))
          return elem[paramsKey].join(',') === filterParams[`filter.${paramsKey}`]
        if (typeof elem[paramsKey] === 'boolean')
          return elem[paramsKey] === (filterParams[`filter.${paramsKey}`] === 'true')
        return `${elem[paramsKey]}`.toLowerCase().includes(`${filterParams[`filter.${paramsKey}`]}`.toLowerCase())
      })
    }
  }

  if (params.search) {
    return filterArray.filter(elem => {
      let include = false;
      for (let value in elem) {
        if (typeof elem[value] !== 'string') continue;
        include = include ? include : elem[value].toString().includes(params.search)
      }

      return include;
    });
  }

  return filterArray;
}

function addIdOnElem(elem) {
  return {
    ...elem,
    id: uuidv4()
  }
}

function addElemOnArrayWithId(array, elem) {
  const elemWithId = {
    ...elem,
    id: uuidv4()
  }
  return [...array, elemWithId]
}

function pushElem(array, elem, absolutePath) {
  const elemWithId = addIdOnElem(elem)
  const newArray = [...array, elemWithId]
  fs.writeFileSync(absolutePath, JSON.stringify(newArray, null, 2), 'utf-8')
  return elemWithId
}

function readFile(absolutePath) {
  return JSON.parse(fs.readFileSync(absolutePath, { encoding: 'utf8', flag: 'r' }))
}

const settings = async (endpointName) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  const settingsFilePath = './settings/data.json'
  const settings = readFile(settingsFilePath)
  const setting = settings.find(setting => setting.name === endpointName)
  await delay(setting.delay)
  return setting.isErrorRequest
}

const filteredAndPaginationSort = (data, params) => {
  const filterContent = filterSort(data, params)
  const content = paginationSort(filterContent, params);
  return {
    content,
    number: parseInt(params.page),
    numberOfElements: content.length,
    size: parseInt(params.size),
    totalElements: filterContent.length,
    totalPages: parseInt(params.size ?? "0") !== 0
      ? Number.isInteger(filterContent.length / parseInt(params.size ?? "0"))
        ? filterContent.length / parseInt(params.size ?? "0")
        : Math.floor(filterContent.length / parseInt(params.size ?? "0")) + 1
      : 0
  }
}

const usersfilePath = './users/data.json'

const getUserIdByHeader = (req) => {
  const users = readFile(usersfilePath)
  const userCode = req.headers.authorization.substring(7)
  const username = jwtDecode(userCode).user_name
  const user = users.find(user => user.username === username)
  const userId = user?.id

  const findUserByHostId = users.find(user => user.hostUser?.id === userId)

  return findUserByHostId?.id || userId
}

const getRealUserIdByHeader = (req) => {
  const users = readFile(usersfilePath)
  const userCode = req.headers.authorization.substring(7)
  const username = jwtDecode(userCode).user_name
  const user = users.find(user => user.username === username)

  return user.id
}

function rewriteFile(data, absolutePath) {
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8')
}

module.exports = {
  delay,
  paginationSort,
  deleteById,
  deleteByIds,
  createElem,
  putElemById,
  concatElemById,
  concatElemsByIds,
  putElemToCMSById,
  filterSort,
  addElemOnArrayWithId,
  pushElem,
  readFile,
  settings,
  filteredAndPaginationSort,
  deleteByArchivIds,
  replaceElems,
  getUserIdByHeader,
  getRealUserIdByHeader,
  rewriteFile,
}