document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
  
    var mailtoLink = 'mailto:basildev.biz@gmail.com' + 
                     '?subject=' + encodeURIComponent('Hello Basil : ') + 
                     '&body=' + encodeURIComponent(`${message} \n\nKind Regards, \n${name}. \n\n ${email}\n`);
  
    
    window.location.href = mailtoLink;
  });