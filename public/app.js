var root = 'http://localhost:3000'

window.onload =  function(){
  console.log('ready');

  // // document.querySelector('#send').addEventListener('click', 
  //   document.querySelector('#send').addEventListener('click', ()=>{
  //   const color =  $('#input').val()
  //   $.post('/on', {color})
  // })


  //  document.querySelector('#send2').addEventListener('click', ()=>{
  //   const color =  $('#input2').val()
  //   $.post('/off', {color})
  // })


  document.querySelector('#morse-button').addEventListener('click', morseSubmit)

}



const  morseSubmit =  async (e)=>{
  const inputNode = document.querySelector('#morse-text');

  const data = {text: inputNode.value}
  
   const res = await fetch(root + '/morse', {
    method: 'POST', //x
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  })


  if (res.status == '200'){
    inputNode.value = '';
    alert('successfully sent morse code!')
  } else {
    alert('an error occured:', res.statusText)
    
  }
  
}