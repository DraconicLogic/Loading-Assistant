import * as local from "../services/local.js"

export async function loadStackData(){
  const localStacks = await local.getStacks();
  return localStacks ? localStacks : {}
}

export function loadDate () { 
  return new Date().toISOString()
}

export async function initializeLocalStorage(){
  const resources = [
    {
      key: "lastEdited",
      value: "1970-01-01T00:00:00Z"
    },
    {
      key: "stacks",
      value: "[]"
    },
    {
      key: "saveStates",
      value: "{}"
    },
    {
      key: "containers",
      value: "{}"
    },
  ]
  resources.forEach((resource) => {
    console.log(Boolean(localStorage.getItem(resource.key)))
    console.log(`LocalStorage - ${resource.key}: `, localStorage.getItem(resource.key))

    if (!localStorage.getItem(resource.key)) {
      localStorage.setItem(`${resource.key}`, `${resource.value}`)
    }
  })
  return;
}