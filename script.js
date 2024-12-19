document.querySelectorAll('.macos-window').forEach(window => {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;
  
    const titlebar = window.querySelector('.macos-titlebar');
  
    const bringToFront = (targetWindow) => {
      document.querySelectorAll('.macos-window').forEach(win => {
        win.style.zIndex = 0; 
      });
      targetWindow.style.zIndex = 1000; 
    };
  
    titlebar.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - window.offsetLeft;
      offsetY = e.clientY - window.offsetTop;
  
      bringToFront(window);
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    window.addEventListener('mousedown', () => bringToFront(window));
  });
  

  const terminalOutput = document.getElementById('terminalOutput');
  
  
  const terminalCommands = [
    { command: "ls", output: "about-me.txt  skills.json  projects/" },
    { command: "cat about-me.txt", output: "Hi, I'm Eliel Filho, a Full Stack Developer based in Brazil." },
    { command: "cat skills.json", output: "{ frontEnd: ['HTML', 'CSS', 'JavaScript', 'Vue.js'], backEnd: ['Node.js', 'Python', 'Java'], tools: ['Git', 'Docker', 'AWS'] }" },
    
    { command: "exit", output: "See you space cowboy !!" }
  ];
  
  let currentCommandIndex = 0;
  

  function typeText(element, text, callback) {
    let index = 0;
    function type() {
      if (index < text.length) {
        element.innerHTML += text[index];
        index++;
        setTimeout(type, 50); 
      } else if (callback) {
        callback(); 
      }
    }
    type();
  }
  
  
  function displayCommand() {

    terminalOutput.innerHTML = "";
  

    const { command, output } = terminalCommands[currentCommandIndex];
  

    const commandElement = document.createElement("p");
    const outputElement = document.createElement("p");

    commandElement.innerHTML = `<span style="color: lightgreen;">user@root</span>:~$ `;
  
   
    terminalOutput.appendChild(commandElement);
    typeText(commandElement, command, () => {
    
      outputElement.style.color = "white";
      typeText(outputElement, output);
      terminalOutput.appendChild(outputElement);
  
   
      currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
    });
  }
  

  setInterval(displayCommand, 5000);
  

  displayCommand();
  