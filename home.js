var slideIndex = 0; //To store current slide index
var slideLength = $('.slides').length;
var modalBackground = $('#modal-background')[0];  //For Blur Background, when modal is open 
var imgModal = $('#modalBoxForPhoto')[0];
var videoModal = $('#modalBoxForVideo')[0];
var imgModalChildren = $('.modal-img-container > img');
var videoModalChildren = $('.modal-video-container > iframe');
var currentImageId = -1;  //To store current image/video being displayed
var currentVideoId = -1;
showSlides();

function showSlides() {
  $(".slides").css('display','none');
  $('.dot-img').attr('src','./images/button.png');
  slideIndex++;
  if (slideIndex > slideLength){
    slideIndex = 1;
  } 
  $('#slide-'+slideIndex).css('display','block');
  $('#dot-'+slideIndex).attr('src','./images/button-act.png'); //Change the dot for the corresponding slide
  setTimeout(showSlides, 3000); //Recursive Call that changes the slide every 3 seconds
}

// When the user clicks on close button (x), close the modal
$('.close').click(function() {
  imgModal.style.display = 'none';
  videoModal.style.display = 'none';
  modalBackground.style.display = 'none';
  for(var i=0; i<videoModalChildren.length; i++){
    //Stop all the videos in iframe 
    videoModalChildren[i].src = videoModalChildren[i].src.replace('?autoplay=1','');
  }
});

//Open Modal when any of the image / video is clicked
$('.media-img').click(function(){
  var img_id = this.id.split('-')[3];
  imgModal.style.display = 'block';
  modalBackground.style.display = 'block';
  $('.modal-img-container > img').css('display','none');
  $('#modal-img-'+img_id).css('display','block');
  currentImageId = parseInt(img_id);
});

$('.media-video').click(function(){
  var video_id = this.id.split('-')[3];
  videoModal.style.display = 'block';
  modalBackground.style.display = 'block';
  for(var i=0; i<videoModalChildren.length; i++){
    videoModalChildren[i].style.display = 'none';  //Hide and stop all videos
    videoModalChildren[i].src = videoModalChildren[i].src.replace('?autoplay=1','');
  }
  $('#modal-video-'+video_id).css('display','block');
  $('#modal-video-'+video_id).attr('src', ($('#modal-video-'+video_id).attr('src')+'?autoplay=1'));  //add autoplay to video being played
  currentVideoId = parseInt(video_id);
});


$('.prev-next-button').click(function(){
  var idArray = this.id.split('-');
  var prevNext = idArray[0];
  var imgVideo = idArray[1];
  if(imgVideo == 'img'){
    $('#modal-img-'+ currentImageId).css('display','none');  //Hide the current image
    if(prevNext == 'prev'){
      currentImageId = currentImageId-1;
      if(currentImageId < 1){
        currentImageId = imgModalChildren.length;
      }
    }else if(prevNext == 'next'){
      currentImageId = currentImageId+1;
      if(currentImageId > imgModalChildren.length){
        currentImageId = 1;
      }
    }
    $('#modal-img-'+currentImageId).css('display','block'); //Show the next / previous image accordingly
  }else if(imgVideo == 'video'){
    $('#modal-video-'+currentVideoId).css('display','none');  //Hide and stop the current video
    $('#modal-video-'+currentVideoId).attr('src', ($('#modal-video-'+currentVideoId).attr('src').replace('?autoplay=1','')));
    if(prevNext == 'prev'){
      currentVideoId = currentVideoId-1;
      if(currentVideoId<1){
        currentVideoId = videoModalChildren.length;
      }
    }else if(prevNext == 'next'){
      currentVideoId = currentVideoId+1;
      if(currentVideoId > videoModalChildren.length){
        currentVideoId = 1;
      }
    }
    $('#modal-video-'+currentVideoId).css('display','block');  //Show and play the next / previous video
    $('#modal-video-'+currentVideoId).attr('src', ($('#modal-video-'+currentVideoId).attr('src')+'?autoplay=1'));
  }
});