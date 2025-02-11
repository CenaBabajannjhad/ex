function getInputValues(inputEl){
    if(inputEl.value.trim()){
        return inputEl.value.trim()

    }else{
        return "error"
    }
}

export default getInputValues;