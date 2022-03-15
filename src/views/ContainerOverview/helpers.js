export function flattenContainer(containerContent){
  return (
    containerContent
    .reduce((flattened, stackObj) => {
    flattened.push(stackObj.stackContent);
    return flattened;
    }, [])
    // .flat(1)
  )
}

export function baleCount(){

}

export function containerWeight(){}

export function baleCountArray(){}
