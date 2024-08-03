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

    const textArea = document.createElement('textarea');
    textArea.addEventListener('input', function() {
        adjustFontSize(textArea);
    });

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

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
    });

    buttonsDiv.appendChild(postBtn);
    buttonsDiv.appendChild(deleteBtn);

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = getCurrentTimeStamp();

    stickyNote.appendChild(buttonsDiv);
    stickyNote.appendChild(textArea);
    stickyNote.appendChild(timestamp);



    // Make the note draggable
    makeDraggable(stickyNote);

    board.appendChild(stickyNote);
}

function makeDraggable(element) {
    element.onmousedown = function(event) {
        let shiftX = event.clientX - element.getBoundingClientRect().left;
        let shiftY = event.clientY - element.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            element.style.left = pageX - shiftX + 'px';
            element.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        element.onmouseup = null; // Remove any previous onmouseup handler
    };

    element.ondragstart = function() {
        return false;
    };
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