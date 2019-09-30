const http = new easyHTTP();


// ======= EVENT LISTENERS ===========//
// Buttons
document.querySelector('.get-btn').addEventListener('click', httpGet)
document.querySelector('.post-btn').addEventListener('click', httpPost)
document.querySelector('.put-btn').addEventListener('click', httpPut)
document.querySelector('.delete-btn').addEventListener('click', httpDelete)


// ========= GET METHOD ===========//

function httpGet () {
    // Get Input Value
    const postID = document.querySelector('.get-input').value;
    // Default URL
    let url = 'https://jsonplaceholder.typicode.com/posts';
    // Check if PostID Is Null
    if(postID !== null && postID !== ''){
        // Append '/postID' to the url
        url += '/'+ postID
        // GET METHOD - All Posts
        http.get(url, function (err, post) {
            // Check for HTTP Error
            if(err){
                // Check if postID exceeded 100
                if(postID > 100){
                    showAlert('warning', 'Typically IDs range from 1-100')
                }
                // Display error
                response = err;
            } else {
                response = formatPost(post)
            }
            postHtml(err, response)
        })
    }
    // In case no value has been entered Show all posts
    else {
        http.get(url, function (err, post) {
            if(err){
                response = err;
            } else {
                response = formatAllPosts(post)
            }
            showAlert('success', 'All Posts Displayed!')
            postHtml(err, response)
        })
    }
}

// ========= POST METHOD ===========//
function httpPost(){
    const title = document.querySelector('.post-title').value;
    const body = document.querySelector('.post-body').value;
    const data = {title, body};
    let response;
    if (title === '' || body === ''){
        showAlert('danger', 'Please fill the required fields')
    } else {
        http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post){
        if (err){
            //  Show Alert
            showAlert('danger', 'Something went Wrong !');
            // Set response to HttpError
            response = err;
        } else {
            showAlert('success', 'The Post has been Created!')
            response = formatPost(post);
        }
        postHtml(err, response);
        });
    }   
}

// ======== PUT METHOD ===========//
function httpPut(){
    // Initialize all Fields
    const postID = document.querySelector('.put-id').value,
        title = document.querySelector('.put-title').value,
        body = document.querySelector('.put-body').value,
        // Object to send
        data = {title, body};
        if (title === '' || body === '' || postID === null || postID === ''){
            showAlert('danger', 'Please fill the required fields')
        } else{
            http.put(`https://jsonplaceholder.typicode.com/posts/${postID}`, data, function(err, post){
                if (err){
                    // Check if postID exceeded 100
                    if(postID > 100){
                    showAlert('warning', 'Typically IDs range from 1-100')
                    } else{
                        //  Show Alert
                        showAlert('danger', 'Something went Wrong !');
                    }
                    // Set response to HttpError
                    response = err;
                } else {
                    showAlert('success', 'The Post has been Created!')
                    response = formatPost(post);
                }
                postHtml(err, response);
            }); 
        }
 
}

// ======== DELETE METHOD ===========//
function httpDelete () {
    // Get Input Value
    const postID = document.querySelector('.delete-input').value;
    // Default URL
    let url = 'https://jsonplaceholder.typicode.com/posts';
    // Check if PostID Is Null
    if(postID !== null && postID !== ''){
        // Append '/postID' to the url
        url += '/'+ postID
        // GET METHOD - All Posts
        http.delete(url, function (err, post) {
            // Check for HTTP Error
            if(err){
                showAlert('warning', 'OOPS! Something went wrong')
                // Display error
                response = err;
            } else {
                showAlert('success', `The post No. ${postID} has been deleted Successfully`)
            }
            postHtml(err, ' ')
        })
    } else {
        showAlert('warning', 'Enter a PostID')
    }
    
}







// ============================== SECONDARY FUNCTIONS ======================== // 

// Show Notification
function showAlert(status, alert){
    let notification = document.querySelector('.notification')
    // Set Notification's bootstrap class
    notification.classList.add(`alert-${status}`);
    // Set text to the alert
    notification.textContent = alert;
    // Scroll to the bottom
    scrollToBottom();
    // Display Block
    notification.style.display = 'Block'
    // Set display to none after 3 secs
    setTimeout(function(){
        notification.style.display = 'none';
    }, 3000)
}


// Format Single Post
function formatPost(string) {
    const post = JSON.parse(string);
    console.log(string);
    
    let html = `
    <h3>${post.title.toUpperCase()}</h3>
        <p>${post.body}</p>
        <p class="float-right">Post ID: ${post.id} <br/>User ID: ${post.userId}</p>
    `
    console.log(string);
    
    return html;
}


// Format Multiple Post
function formatAllPosts(string) {
    const posts = JSON.parse(string);
    let html ='';
    posts.forEach(function(post){
        html += `
        <h3>${post.title.toUpperCase()}</h3>
            <p>${post.body}</p>
            <p class="float-right">Post ID: ${post.id} <br/>User ID: ${post.userId}</p>
            <br><hr>
        ` 
    });
    return html
}


// Post HTML
function postHtml (status, post){
    const body = document.getElementById('response');
    if(status){
        body.style.color = 'Red';
        body.innerHTML = post
    } else {
        body.style.color = 'Green';
        body.innerHTML = post
    }
    scrollToBottom();
}


//Scroll to Bottom of the Page 
function scrollToBottom (){
    window.scrollTo({
        top: window.outerHeight,
        left: 0,
        behavior: 'smooth'
      });
}