document.addEventListener('DOMContentLoaded', function() {
  let queryParameter = location.search.substring(1).split('&')[0].split('=')[1];
  if (queryParameter !== undefined) {
    document.getElementById('access-token').value = queryParameter;
  }

  document.getElementById('send-button').addEventListener('click', function() {
    let accessToken = document.getElementById('access-token').value;
    let message = document.getElementById('message').value;
    let request = document.getElementById('request');
    let response = document.getElementById('response');
    let result = document.getElementById('result');

    request.textContent = 'リクエスト：' + JSON.stringify({ 'access-token': accessToken, 'message': message});
    response.textContent = '';

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          response.textContent = 'レスポンス：' + xhr.responseText;
          result.textContent = '';
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
        } else {
          result.textContent = 'サーバーエラーが発生しました。';
        }
      } else {
        result.textContent = '通信中...';
      }
    };
    xhr.open('POST', 'send_line.php?access-token=' + accessToken + '&message=' + encodeURIComponent(message), true);
    xhr.send(null);
  }, false);
}, false);