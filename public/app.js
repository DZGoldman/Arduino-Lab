$(window).load( function(){
  console.log('ready');


  $('#send').click(()=>{
    const text =  $('#input').val()
    $.post('/', {text})
  })

})
