$(window).load(function(){
    
    // ieCheck
    var ie = false;
    var aniButtonDuration = 350;
    
    if($.browser.msie && $.browser.version<9){
        aniButtonDuration = 0;
        ie = true;
    }
    //resize
   	var mainDIV = $('.main');
    $(window).resize(function()
    {
       resizeContent(500); 
    });
    
    function resizeContent(_animationSpeed){
        var window_H = $(window).height() - 64;
        var mainDIV_H = 470;
         
        if (window_H > mainDIV_H && window_H > 650 ) {
			mainDIV.stop().animate({marginTop:~~((window_H - mainDIV_H)/2)}, _animationSpeed, 'easeOutCubic');	
		} else {
			mainDIV.stop().animate({marginTop:30}, _animationSpeed, 'easeOutCubic');	
		}
    }
    
    resizeContent(0);
    
	$('#bgStretch')
		.bgStretch({
			align:'rightBottom',
			navigs:$('.bgNav').navigs()
		}).sImg({
			spinner:$('.gall_spinner').hide()
		})
     
    // accordion
    $( "#accordion" ).accordion();
    $( "#accordion" ).accordion({ icons: { 'header': 'ui-icon-plus', 'headerSelected': 'ui-icon-minus' } });   
    
    //gallery  
    function thumbOver(thumb){
       thumb.animate({opacity:1}, aniButtonDuration,'easeOutCubic');
    }
    
    function thumbOut(thumb){
       thumb.animate({opacity:0}, aniButtonDuration,'easeOutCubic');
    }
    
  
    var galleryAnimation = false;
    var Img=$("#galleryThumbs .active").attr('href');
    var ImgHolder = $("#galleryThumbs .active").find('img');

    $('#galleryThumbs li').each(function(){
        if(!$(this).find('a').hasClass('active')){
            $(this).find('span').css({opacity:0});
        }
    })
    
    $("#galleryPreview ul > li").find('img').css({opacity:'0', display:'none'});
    $(Img).find('img').css({opacity:'1', display:'block'});
    
    thumbOver(ImgHolder);
    
    $("#galleryThumbs li >a span").hover(function(){
        if(Img != $(this).parent().attr('href')){
            thumbOver($(this).parent().find('span'))
        }
    }, function(){
        if(Img != $(this).parent().attr('href')){
            thumbOut($(this).parent().find('span'))
        }
    })
    
    $("#galleryThumbs li >a").click(function(){
            
        if(!galleryAnimation){
            
      		var ImgId = $(this).attr("href");
            
            if (ImgId!=Img) 
            {
               $(Img).find('img').stop().animate({ left: '298px', top:'277px', width:'1px', height:'1px' }, 800,'easeInOutCubic',function(){
                    $(this).css({display:'none'});
				    $(this).removeClass('active');
                    galleryAnimation = false;
               });
                
               $(ImgId).find('img').css({display:'block', opacity:1, left: '0px', top:'0px', width:'1px', height:'1px' }).stop().animate({ opacity: "1", left: '0px', top:'0px', width:'298px', height:'277px' }, 800, 'easeInOutCubic')
               
               thumbOut(ImgHolder.parent().find('span'));
            
                ImgHolder = $(this).find('img');
        		Img=ImgId;
            }
        }
  	  return false;
   })
    
    	
    //content switch
    
   $('ul#menu').superfish({
      delay:       700,
      animation:   {height:'show'},
      speed:       700,
      autoArrows:  false,
      dropShadows: true
    });

	var content=$('#content'),
	nav=$('.menu');
	nav.navs({
		useHash:true,
		hoverIn:function(li){
			$('> a span',li).stop().animate({opacity:.5},aniButtonDuration,'easeOutCubic');
		},
		hoverOut:function(li){
			if (!li.hasClass('with_ul') || !li.hasClass('sfHover')) {
				$('> a span',li).stop().animate({opacity:.9},aniButtonDuration,'easeOutCubic');
			}
		},
		hover:true
	})
	nav.navs(function(n, _){
		content.cont_sw(n);
	})
	content.cont_sw({
		showFu:function()
        {
            var _=this
            
            if(_.prev > -1){
                aniDelay = 830;
            }else{
                aniDelay = 300;
            }                        

             $('header').animate({top:'0px'}, 500,'easeOutCubic');
		    _.next.css({display:'block'}).stop().delay(aniDelay).animate({top:'0px'}, 800,'easeOutBack');	
		},
		hideFu:function()
        {
            var _=this
            
		    _.li.stop().animate({top:'-460px'}, 800,'easeInBack', function(){
                $(this).css({display:'none'});
            });                       
		},
		preFu:function()
        {
			var _=this;
            
            $('header').css({top:'230px'});
			_.li.css({top:'-460px', display:'none'});
			//$('.menu').css({bottom:'79px', display:'none'})
		}
	})
		 
})