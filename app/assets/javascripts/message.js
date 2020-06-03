$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message">
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){    //new_messageのidで送信イベントを起こす
    e.preventDefault();  //Javascriptのsubmitイベントは自動でページが更新されるので、それをキャンセルするメソッド
                         //  ↑ここまでがイベント発火に必要な記述
    let formData = new FormData(this);  //thisはイベントの発火もとを指している
                       // ↑ フォームに登録されたデータを取ってくる
    let url = $(this).attr('action');  // attrでactionの中身、データを取り出す
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log(data);
      var html = buildHTML(data);
      $('.main-chat__messages').append(html);
      $('form')[0].reset();
                                // ↓ スクロールしたときに一番下にいくように設定するもの
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      // $('.main-chat__form__new_message__input-box--image');
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
     
    .always(function() {  //常にinputboxを送信された(されない)ときに空にする
      $('.main-chat__form__new_message__edit-btn').prop('disabled', false);
    });
  });
});