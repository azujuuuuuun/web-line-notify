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