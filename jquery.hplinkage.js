/*
Ajax 三级省市联动
日期：2012-7-18

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
required:必选项
------------------------------ */
$.extend($.fn,{
	hpLinkage: function( settings ){
		settings = $.extend( true , {
            url:"js/city.min.js",
            prov: { selector: ".prov" , defaultvalue: "" },
            city: { selector: ".city" , defaultvalue: "" },
            dist: { selector: ".dist" , defaultvalue: "" },
            required: true
		} , settings ) ;
		this.each(function( index , val  ){
			new hpLinkage( this , settings ) ;
		});
		return this;
	}
});
function hpLinkage( context , settings ){
	this.context = context ;
	this.settings = settings ;
	this.temple = settings.required ? "" : "<option value=''>请选择...</option>" ;
	this.selected = { prov: "" , city: "" , dist: "" };
	this.init = function(){
		this.getAreaJson();
	};
	this.init();
};
hpLinkage.prototype.getAreaJson = function(){
	var that = this ,
		  $this = $( this.context ) ,
		  settings = this.settings ;
	if( Object.prototype.toString.call( settings.url ) == "[object String]" ){
		$.ajax({
    		type: "get" ,
    		url: settings.url ,
    		dataType: "json" ,
    		success: function( data ){
    			that.AREAJSON = data;
    			that.onLinkage();
    		},
    		error: function( ){
    			that.AREAJSON = null;
    			NSLog( arguments ) ;
    		}
    	});
	};
};
hpLinkage.prototype.onLinkage = function(){
	if( !!!this.AREAJSON ) { return false; }					// 不存在地区数据的情况
	var that = this ,
		  $this = $( this.context ) ,
		  settings = this.settings ;
	$this.on("change.hpLink", settings.prov.selector , function(){
		var $this = $( this ) ,
			  value = $.trim( $this.val() ) ;
		that.selected.prov = value ;
		that.parseCityHTML() ;
	}).on("change.hpLink", settings.city.selector , function(){
		var $this = $( this ) ,
			  value = $.trim( $this.val() ) ;
		that.selected.city = value ;
		that.parseDistHTML( value ) ;
	}).on("change.hpLink", settings.dist.selector , function(){
		var $this = $( this ) ,
			  value = $.trim( $this.val() ) ;
		that.selected.dist = value ;
	});
	that.parseProvHTML();
	// 设置默认值
	if( settings.prov.defaultvalue ){
		$this.find( settings.prov.selector ).val( settings.prov.defaultvalue ).trigger("change.hpLink");
	};
	if( settings.city.defaultvalue ){
		$this.find( settings.city.selector ).val( settings.city.defaultvalue ).trigger("change.hpLink");
	};
	if( settings.dist.defaultvalue ){
		$this.find( settings.dist.selector ).val( settings.dist.defaultvalue );
	};
};
hpLinkage.prototype.parseProvHTML = function(){
	var that = this ,
		  $this = $( this.context ) ,
		  settings = this.settings ;
	var provhtml = that.temple ;
	$.each( that.AREAJSON , function( index , prov ){
		provhtml += "<option value='" + prov.area_no + "'>" + prov.area_name + "</option>";
	} );
	$this.find( settings.prov.selector ).html( provhtml );
};
hpLinkage.prototype.parseCityHTML = function(){
	var that = this ,
		  $this = $( this.context ) ,
		  settings = this.settings ,
		  prono = that.selected.prov ;
	var cityhtml = that.temple ;
	$.each( that.AREAJSON , function( index , prov ){
		if( prov.area_no == prono ){
			$.each( prov.subAreas , function( index , city ){
				cityhtml += "<option value='" + city.area_no + "'>" + city.area_name + "</option>";
			} );
			return false;
		}else{
			return true;
		};
	} );
	$this.find( settings.city.selector ).html( cityhtml );
	$this.find( settings.dist.selector ).html( that.temple );
};
hpLinkage.prototype.parseDistHTML = function( prono ){
	var that = this ,
		  $this = $( this.context ) ,
		  settings = this.settings ,
		  prono = that.selected.prov ,
		  cityno = that.selected.city ;
	var disthtml = that.temple ;
	$.each( that.AREAJSON , function( index , prov ){
		if( prov.area_no == prono ){
			$.each( prov.subAreas , function( index , city ){
				if( city.area_no == cityno ){
					$.each( city.subAreas , function( index , dist ){
						disthtml += "<option value='" + dist.area_no + "'>" + dist.area_name + "</option>";
					} );
					return false;
				}else{
					return true;
				};
			} );
			return false;
		}else{
			return true;
		};
	} );
	$this.find( settings.dist.selector ).html( disthtml );
};
function NSLog( msg ){
	if( window.console && window.console.log ){
		console.log( msg , "未找到地址数据文件" );
	};
};