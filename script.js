let stories = JSON.parse(localStorage.getItem('yuta_stories')) || [
    { id: 1, title: "메인 줄거리", content: "여기에 큰 줄거리를 작성하세요.", parentId: null }
];
let currentDocId = stories[0].id;
let isEditing = false;

const viewer = document.getElementById('viewer');
const editor = document.getElementById('editor');
const editBtn = document.getElementById('edit-btn');
const storyListUI = document.getElementById('story-list');

function render() {
    const currentDoc = stories.find(s => s.id === currentDocId);
    document.getElementById('current-title').innerText = currentDoc.title;
    viewer.innerHTML = currentDoc.content.replace(/==(.+?)==/g, '<span class="highlight">$1</span>');
    editor.value = currentDoc.content;
    updateSidebar();
    localStorage.setItem('yuta_stories', JSON.stringify(stories));
}

function updateSidebar() {
    storyListUI.innerHTML = '';
    stories.forEach(story => {
        const li = document.createElement('li');
        li.className = `story-item ${story.id === currentDocId ? 'active' : ''} ${story.parentId ? 'child' : ''}`;
        li.innerText = `📄 ${story.title}`;
        li.onclick = () => { currentDocId = story.id; isEditing = false; updateDisplay(); render(); };
        storyListUI.appendChild(li);
    });
}

function updateDisplay() {
    viewer.style.display = isEditing ? 'none' : 'block';
    editor.style.display = isEditing ? 'block' : 'none';
    editBtn.innerText = isEditing ? '저장 완료' : '편집 시작';
}

function handleEdit() {
    const currentDoc = stories.find(s => s.id === currentDocId);
    if (!isEditing) {
        isEditing = true;
        updateDisplay();
        editor.focus();
    } else {
        currentDoc.content = editor.value;
        isEditing = false;
        updateDisplay();
        render();
    }
}

function makeSubDocument() {
    let selectedText = isEditing ? 
        editor.value.substring(editor.selectionStart, editor.selectionEnd) : 
        window.getSelection().toString();

    if (!selectedText.trim()) return alert("단락을 드래그하여 선택해주세요.");

    const newSubDoc = {
        id: Date.now(),
        title: selectedText.substring(0, 15) + "...",
        content: selectedText,
        parentId: currentDocId
    };
    stories.push(newSubDoc);
    currentDocId = newSubDoc.id;
    isEditing = false;
    render();
    updateDisplay();
}

function createNewStory() {
    const title = prompt("스토리 제목:");
    if(title) {
        const newDoc = { id: Date.now(), title, content: "", parentId: null };
        stories.push(newDoc);
        currentDocId = newDoc.id;
        render();
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('open');
}

render();
updateDisplay();
