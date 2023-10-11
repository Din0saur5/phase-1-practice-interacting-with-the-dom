/*
As a user, I can:

See the timer increment every second once the page has loaded.
Manually increment and decrement the counter using the plus and minus buttons.
"Like" an individual number of the counter. I should see the count of the number of "likes" associated with that number displayed.
Pause the counter, which should:
pause the counter
disable all buttons except the pause button
switch the label on the button from "pause" to "resume"
Click the "resume" button to restart the counter and re-enable the buttons.
Leave comments on my gameplay, such as: "Wow, what a fun game this is." 



*/
document.addEventListener("DOMContentLoaded", counterFn());

function counterFn(){
    const timer = document.getElementById("counter");
    const minus = document.getElementById("minus");
    const plus = document.getElementById("plus");
    const heart = document.getElementById("heart");
    const likes = document.querySelector(".likes")
  //timer
  
    let seconds =0 
   
    let timerCount = setInterval(()=>{
        seconds++
        timer.textContent = seconds;
    }, 1000)

//pause button
    const pause = document.getElementById('pause')
    pause.addEventListener('click', ()=>{
       if(pause.innerText === "pause"){
        clearInterval(timerCount);
        pause.innerText = 'GO'
        minus.disabled = true;
        plus.disabled = true;
        heart.disabled = true;
    }
        else{
           pause.textContent = 'pause'
           timerCount = setInterval(()=>{
            seconds++
            timer.textContent = seconds;
        }, 1000)

        minus.disabled = false;
        plus.disabled = false;
        heart.disabled = false;
        }
    })


//plus and minus buttons
    plus.addEventListener("click", ()=> 
    timer.textContent = seconds++
    )

    minus.addEventListener("click", ()=> 
    timer.textContent = seconds--
    )
//heart button
    let likeCount = 0
    heart.addEventListener("click", ()=>{
        likeCount++
    if(document.getElementById(`${seconds}`) == null){
     likeCount= 1
    const likeStat = document.createElement("li")
    likeStat.id = seconds
    likes.appendChild(likeStat)}
    document.getElementById(`${seconds}`).textContent = `${seconds} has ${likeCount} likes`
    }
 )

//comments

const form = document.getElementById("comment-form");
const commentSection = document.getElementById("comment-section");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const comment = {
       body: form.comment.value
    }
    return fetch('http://localhost:3000/comments',{ 
    method: 'POST',
    headers: {"Content-Type": 'application/json'},
    accepts: 'application/json',
    body: JSON.stringify(comment)
       })
    .then(resp =>resp.json())
    .then((data)=>{
        console.log(data)
       renderComments(data)

    })
    .then(form.reset())
})

const renderComments = (data)=>{
    const commentEl= document.createElement("p");
    const deleteCom = document.createElement("button")
        commentEl.textContent = `${data.body} `
        commentEl.id = data.id
        commentSection.appendChild(commentEl)
        deleteCom.textContent = "X"
        deleteCom.setAttribute('class', "delete-btn") 
        commentEl.appendChild(deleteCom)
        deleteCom.addEventListener("click", ()=>{
            deleteComment(data)
        })
}
//comment persistance
const persistComments = () =>{
 return fetch('http://localhost:3000/comments')
 .then(resp=>resp.json())
 .then(data=>data.forEach((comment) =>renderComments(comment)))
}

persistComments();

//delete comment

function deleteComment(comment) {
        return fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: "DELETE"
        })
        .then(resp=>resp.json())
            
        .then( document.getElementById(`${comment.id}`).remove())
}

   }



