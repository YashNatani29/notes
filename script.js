let noteCounter = 1; // Global counter to track the number of notes

document.getElementById('add-note-btn').addEventListener('click', function() {
    addStickyNote();
});

function addStickyNote() {
    
    const board = document.getElementById('board');
    const stickyNote = document.createElement('div');
    stickyNote.className = 'sticky-note'; 
    stickyNote.style.top = `${Math.random() * (board.clientHeight - 150)}px`;
    stickyNote.style.left = `${Math.random() * (board.clientWidth - 200)}px`;
    stickyNote.style.backgroundColor = getRandomLightColor();

    const noteTitle = `#Note-${noteCounter}`; // Generate the note title

    const titleDiv = document.createElement('div'); // Create a div for the title
    titleDiv.className = 'title';
    
    const titleText = document.createElement('div'); 
    titleText.className = 'note-title';
    titleText.textContent = noteTitle;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = 'X';
    deleteBtn.addEventListener('click', function() {
        board.removeChild(stickyNote);
    });

    const postBtn = document.createElement('button');
    postBtn.className = 'post-btn';
    postBtn.innerHTML = '✓';
    postBtn.addEventListener('click', function() {
        textArea.setAttribute('readonly', 'true');
        textArea.style.backgroundColor = 'transparent';
        textArea.style.cursor = 'default';
        postBtn.style.display = 'none';
 	deleteBtn.style.display = 'none';
        noteCounter++; // Increment the note counter
    });

    titleDiv.appendChild(postBtn);
    titleDiv.appendChild(titleText);
    titleDiv.appendChild(deleteBtn);


    const textArea = document.createElement('textarea');
    textArea.addEventListener('input', function() {
        adjustFontSize(textArea);
    });

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = getCurrentTimeStamp();

    stickyNote.appendChild(titleDiv); 
    stickyNote.appendChild(textArea);
    stickyNote.appendChild(timestamp);
    
    // Make the note draggable
    makeDraggable(stickyNote);

    board.appendChild(stickyNote);
}

function makeDraggable(element) {
        let shiftX, shiftY;

    const moveAt = (pageX, pageY) => {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    };

    const onMouseMove = (event) => {
        moveAt(event.pageX, event.pageY);
    };

    const onTouchMove = (event) => {
        moveAt(event.touches[0].pageX, event.touches[0].pageY);
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    const onTouchEnd = () => {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    };

    element.onmousedown = function(event) {
        shiftX = event.clientX - element.getBoundingClientRect().left;
        shiftY = event.clientY - element.getBoundingClientRect().top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    element.ontouchstart = function(event) {
        shiftX = event.touches[0].clientX - element.getBoundingClientRect().left;
        shiftY = event.touches[0].clientY - element.getBoundingClientRect().top;

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    };

    element.ondragstart = function() {
        return false;
    }
}

function adjustFontSize(textArea) {
    const maxFontSize = 36;
    const minFontSize = 12;
    let fontSize = maxFontSize;
    textArea.style.fontSize = `${fontSize}px`;

    while (fontSize > minFontSize && (textArea.scrollHeight > textArea.clientHeight || textArea.scrollWidth > textArea.clientWidth)) {
        fontSize--;
        textArea.style.fontSize = `${fontSize}px`;
    }
}

function getRandomLightColor() {
   // List of predefined bright colors
    const colors = [
        '#ff7eb9', '#ff65a3', '#7afcff', '#feff9c',
        '#fff740', '#cdfc93', '#ff7ecd', '#71d7ff',
        '#ce81ff', '#fff68b'
    ];

    // Select a random color from the list
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function getCurrentTimeStamp() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
