events: 'events.json'




let cursorIcons = [
  "https://emojiapi.dev/api/v1/1f41f/64.png", // 🐟
  "https://emojiapi.dev/api/v1/1f421/64.png", // 🐡
  "https://emojiapi.dev/api/v1/1f420/64.png", // 🐠
];
let cursorIndex = 0;

function changeCursor() {
  document.body.style.cursor = `url('${cursorIcons[cursorIndex]}'), auto`;
  cursorIndex = (cursorIndex + 1) % cursorIcons.length;
}

setInterval(changeCursor, 3000);


center: 'title'
// 自画像コメント

function createButton(label, onClick) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = 'action-btn';
    btn.addEventListener('click', onClick);
    return btn;
}

document.getElementById('submit-comment').addEventListener('click', function() {
    const name = document.getElementById('user-name').value || 'Anonymous';
    const commentText = document.getElementById('comment-text').value;
    const avatarFile = document.getElementById('avatar-upload').files[0];
    const timestamp = new Date().toLocaleString();

    if (!commentText) {
        alert('Please write a comment.');
        return;
    }

    const commentContainer = document.createElement('div');
    commentContainer.className = 'comment-item';

    // 名前と日時
    const metaInfo = document.createElement('div');
    metaInfo.className = 'comment-meta';
    metaInfo.innerHTML = `<strong>${name}</strong><br><small>${timestamp}</small>`;
    commentContainer.appendChild(metaInfo);

    // コメント
    const commentPara = document.createElement('p');
    commentPara.className = 'comment-text';
    commentPara.textContent = commentText;
    commentContainer.appendChild(commentPara);

    // 画像
    let avatarImg = null;
    if (avatarFile) {
        avatarImg = document.createElement('img');
        avatarImg.className = 'comment-avatar';
        const reader = new FileReader();
        reader.onload = function(e) {
            avatarImg.src = e.target.result;
            commentContainer.appendChild(avatarImg);
        };
        reader.readAsDataURL(avatarFile);
    }

    // アクションボタン群
    const actions = document.createElement('div');
    actions.className = 'comment-actions';

    // 編集ボタン
    const editBtn = createButton('Edit', () => {
        const newComment = prompt('Edit your comment:', commentPara.textContent);
        if (newComment) commentPara.textContent = newComment;
    });

    // 削除ボタン
    const deleteBtn = createButton('Delete', () => {
        if (confirm('Are you sure to delete this comment?')) {
            commentContainer.remove();
        }
    });

    // 画像変更ボタン
    const changeImgBtn = createButton('Change Image', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', function() {
            const newFile = this.files[0];
            if (newFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (!avatarImg) {
                        avatarImg = document.createElement('img');
                        avatarImg.className = 'comment-avatar';
                        commentContainer.appendChild(avatarImg);
                    }
                    avatarImg.src = e.target.result;
                };
                reader.readAsDataURL(newFile);
            }
        });
        input.click();
    });

    // いいね機能
    let likeCount = 0;
    const likeBtn = createButton('Like', () => {
        likeCount++;
        likeCountSpan.textContent = ` ${likeCount} ❤️`;
    });
    const likeCountSpan = document.createElement('span');
    likeCountSpan.className = 'like-count';
    likeBtn.appendChild(likeCountSpan);

    // ボタンをまとめて追加
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    actions.appendChild(changeImgBtn);
    actions.appendChild(likeBtn);

    commentContainer.appendChild(actions);

    document.getElementById('comments-list').appendChild(commentContainer);

    // フォームクリア
    document.getElementById('user-name').value = '';
    document.getElementById('comment-text').value = '';
    document.getElementById('avatar-upload').value = '';
});










