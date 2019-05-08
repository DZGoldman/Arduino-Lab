var root = "http://localhost:8080";

window.onload = function() {
  document.querySelector("#morse-button").addEventListener("click", morseSubmit);
  document.querySelector("#speak-button").addEventListener("click", speak);

  document.querySelector('#on-buttons').addEventListener('click', turnOn)
  document.querySelector('#off-buttons').addEventListener('click', turnOff)
  document.querySelector('#update').addEventListener('click', update)


};

let morseSubmit = async (e) => {
  const inputNode = document.querySelector("#morse-text");

  const res = await axios.post(root + "/morse", { text: inputNode.value });
  inputNode.value = "";
};


let turnOn  = async (e) =>{
  const target = e.target;
  
  if(!target.classList.contains('button')){
    return
  }
  const color = target.getAttribute('color')
  console.log('color', color)
  const res = await axios.post(root + "/on", { color});
}


let turnOff  = async (e) =>{
  const target = e.target;
  
  if(!target.classList.contains('button')){
    return
  }
  const color = target.getAttribute('color')
  console.log('color', color)
  const res = await axios.post(root + "/off", { color});
}

let speak = async (e)=>{
  const inputNode = document.querySelector("#speak-text");

  const res = await axios.post(root + "/speak", { text: inputNode.value });
  inputNode.value = ""
}


const update = async ()=>{
  const res = await axios.get(root + '/state')
  res.data.forEach((obj)=>{

    const node = document.querySelector(`.light-button[color=${obj.color}]`)
    if (obj.isOn){
      
      node.classList.add('on')
    } else {
      node.classList.remove('on')
    }
  })
}
  // if (res.status == "200") {
  //   inputNode.value = "";
  //   alert("successfully sent morse code!");
  // } else {
  //   alert("an error occured:", res.statusText);
  // }