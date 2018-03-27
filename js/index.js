document.addEventListener('DOMContentLoaded', function() {
  let queryParameter = location.search.substring(1).split('&')[0].split('=')[1];
  if (queryParameter !== undefined) {
    document.getElementById('access-token').value = queryParameter;
  }

  document.getElementById('send-button').addEventListener('click', function() {
    let result = document.getElementById('result');
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let responseText = JSON.parse(xhr.responseText);
          if (responseText.status === 200) {
            alert('送信しました。');
          } else if (responseText.status === 400 && responseText.message === 'message: may not be empty') {
            alert('エラー：メッセージを入力してください。');
          } else if (responseText.status === 401 && responseText.message === 'Missing Bearer') {
            alert('エラー：アクセストークンを入力してください。');
          } else if (responseText.status === 401 && responseText.message === 'Invalid access token') {
            alert('エラー：無効なアクセストークンです。');
          } else {
            alert('エラー：送信に失敗しました。');
          }
          result.textContent = xhr.responseText;
        } else {
          result.textContent = 'サーバーエラーが発生しました。';
        }
      } else {
        result.textContent = '通信中...';
      }
    };
    xhr.open('POST', 'send_line.php?access-token=' + encodeURIComponent(document.getElementById('access-token').value) + '&message=' + encodeURIComponent(document.getElementById('message').value), true);
    xhr.send(null);
  }, false);
}, false);