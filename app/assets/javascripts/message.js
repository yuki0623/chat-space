$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-chat__messages__date-massage__upper-info" data-message-id=${message.id}>
        <div class="main-chat__messages__date-massage__upper-info__berths">
          <div class="upper-message">
            <div class="talker">
              ${message.user_name}
            </div>
            <div class="date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__messages__deta-message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>
      </div>`
      return html;
    } else {
      var html =
      `<div class="main-chat__messages__date-massage__upper-info" data-message-id=${message.id}>
        <div class="main-chat__messages__date-massage__upper-info__berths" >
          <div class="upper-message">
            <div class="talker">
              ${message.user_name}
            </div>
            <div class="date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__messages__deta-message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
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

  var reloadMessages = function() {
    var last_message_id = $('.main-chat__messages__date-massage__upper-info:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__messages').append(insertHTML);
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);

    }
});

