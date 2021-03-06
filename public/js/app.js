const wheaterForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#message1')
const p2 = document.querySelector('#message2')

wheaterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    p1.textContent = 'Loading ....'
    p2.textContent = ''
    
    fetch('/wheater?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                p1.textContent = data.error;
            }else{
                p1.textContent = data.location;
                p2.textContent = data.data;
            }
        })
    })

})



