let isEditing = false;

function toggleEditMode() {
    const viewer = document.getElementById('viewer');
    const editor = document.getElementById('editor');
    const btn = document.getElementById('edit-btn');

    if (!isEditing) {
        // 편집 모드로 전환
        editor.value = viewer.innerText; // 현재 내용을 에디터로 복사
        viewer.style.display = 'none';
        editor.style.display = 'block';
        btn.innerText = '저장 완료';
        isEditing = true;
    } else {
        // 조회 모드로 전환 (저장)
        viewer.innerText = editor.value; // 에디터 내용을 뷰어로 복사
        editor.style.display = 'none';
        viewer.style.display = 'block';
        btn.innerText = '편집 시작';
        isEditing = false;
        // 여기서 나중에 Firebase 저장 코드를 넣으면 됩니다!
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}
