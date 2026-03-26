let isEditing = false;
let contentData = "1. 오프닝\n주인공 '민우'는 평범한 회사원이지만... ==의문의 편지==를 받게 되면서 일상이 균열이 간다.";

const viewer = document.getElementById('viewer');
const editor = document.getElementById('editor');
const editBtn = document.getElementById('edit-btn');
const sidebar = document.getElementById('sidebar');

function render() {
    const htmlContent = contentData.replace(/==(.+?)==/g, '<span class="highlight">$1</span>');
    viewer.innerHTML = htmlContent;
    editor.value = contentData;
}

function handleEdit() {
    if (!isEditing) {
        viewer.style.display = 'none';
        editor.style.display = 'block';
        editBtn.innerText = '저장 완료';
        editBtn.classList.add('editing');
        isEditing = true;
        editor.focus();
    } else {
        contentData = editor.value;
        viewer.style.display = 'block';
        editor.style.display = 'none';
        editBtn.innerText = '편집 시작';
        editBtn.classList.remove('editing');
        isEditing = false;
        render();
    }
}

function toggleSidebar() {
    sidebar.classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('open');
}

function loadDoc(title) {
    document.getElementById('current-title').innerText = title;
    if(window.innerWidth <= 768) toggleSidebar();
}

render();
