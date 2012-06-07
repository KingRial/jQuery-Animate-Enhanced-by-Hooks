/**
 * jQuery Animate enhanced by Hooks v0.0.3
 *  "jQuery Animate enhanced by Hooks" is a jQuery Plugin to let animate function (http://api.jquery.com/animate/) to use CSS3 feature when possible.
 *  By using CSS3 features like transition, translate or translate3d, this plugin will let better performances during animation on all the systems, especially on mobiles.
 *  The entire plugin is based on jQuery Hooks (http://api.jquery.com/jQuery.cssHooks/) and it requires jQuery 1.4.3+ version to be used.
 *  http://
 *
 * Intended for use with the latest jQuery
 *  http://code.jquery.com/jquery-latest.js
 *
 * Copyright 2012, Riccardo Re
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://jquery.org/license
 *
 * Date:
 */
  
(function($) {
	if(!$.cssHooks){
		//Ignoring plugin if jQuery doesn't suppor hooks
		throw('jQuery 1.4.3+ is needed for this plugin to work');
		return;
	}
	
	var aCssPrefixes=['-o-','-moz-','-webkit-',''],
		aCssTransitionProperties = ['top', 'right', 'bottom', 'left', 'opacity', 'height', 'width'],
		aCssDirections = ['top', 'right', 'bottom', 'left'];
	
	var thisBody = document.body || document.documentElement,
		thisStyle = thisBody.style;
	
	$.support.transition=(thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.OTransition !== undefined || thisStyle.transition !== undefined)
	if(!$.support.transition){
		//Ignoring plugin if there is no support for transition
		return;
	}
	$.support.translate3d=('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
	
	var options={
		bUse3d:true && jQuery.support.translate3d
	}
	
	/**
		@private
		@name _getTranslation
		@function
		@description Make a translate or translate3d string
		@param {integer} [x]
		@param {integer} [y]
		@param {boolean} [bUse3D] Use translate3d if available?
	*/
	function _getTranslation(x,y,bUse3D) {
		return ((bUse3D === true || (use3DByDefault === true && bUse3D !== false)) && $.support.translate3d) ? 'translate3d(' + x + 'px, ' + y + 'px, 0)' : 'translate(' + x + 'px,' + y + 'px)';
	}
	
	/**
		@private
		@name _isAppropriateProperty
		@function
		@description Function to check if property should be handled by plugin
		@param {string} [prop]
		@param {variant} [value]
		@param {jQuery Object} [element]
	*/
	function _isAppropriateProperty(prop,value,element) {
		var bIs=($.inArray(prop, aCssTransitionProperties) > -1);
		return bIs;
	}
	
	/**
		@private
		@name _cleanValue
		@function
		@description 
		@param {variant} [value] Target value
		@param {boolean} [fResult] sanitized value
	*/
	function _cleanValue(value){
		var fResult=0;
		if(value!='auto')fResult=parseFloat(value.replace(/px/i, ''));
		return fResult;
	}
	
	//Adding Hooks
	for(var i in aCssTransitionProperties){
		var sCssProp=aCssTransitionProperties[i];
		$.fx.step[sCssProp]=function(fx){
					var prop=fx.prop //Css Property
					var propUnit=fx.unit //Css Unit
					var propValue=fx.end //Value
					var iDuration=fx.options.duration //Fx duration
					var jElement=$(fx.elem);
					var bIsTransform=($.inArray(prop,aCssDirections) > -1);
					var bIsApropriateProperty=_isAppropriateProperty(prop,propValue,jElement);
					if(bIsApropriateProperty){
						//Custom behaviour
						if(fx.now==fx.start){//Start
							var oCss={};
							for (var i=0;i<aCssPrefixes.length;i++){
								var oTransformVector={};
								//Checking Presence for concurrent animations
								var sTransitionPrepend=jElement.prop('style')[aCssPrefixes[i]+'transition'];
								if(bIsTransform){
									var sPrecedentTransform=jElement.prop('style')[aCssPrefixes[i]+'transform'];
									oTransformVector.x=(prop=='left'||prop=='right'?iRelativeValue:0);
									oTransformVector.y=(prop=='top'||prop=='bottom'?iRelativeValue:0);
									if(sPrecedentTransform){
										var aTransformVector=sPrecedentTransform.split('(')[1].split(')')[0].split(',');
										oTransformVector.x+=_cleanValue(aTransformVector[0]);
										oTransformVector.y+=_cleanValue(aTransformVector[1]);
									}
								}
								//Creating new Css
								var iRelativeValue=propValue-_cleanValue(jElement.css(prop));
								oCss[aCssPrefixes[i]+'transition']=(bIsTransform?
										aCssPrefixes[i]+'transform ':
										(sTransitionPrepend?sTransitionPrepend+', ':'')+prop+' '
									)+(iDuration>0?iDuration+'ms ease-in-out':'');
								if(bIsTransform)oCss[aCssPrefixes[i]+'transform']=_getTranslation(oTransformVector.x,oTransformVector.y,options.bUse3d);
								else oCss[prop]=propValue+propUnit;
							}
							//Setting new Css
							jElement.css(oCss);
						}
						else if(fx.now==fx.end){//End
							var oCss={};
							for (var i=0;i<aCssPrefixes.length;i++){
								oCss[aCssPrefixes[i]+'transition']='';
								oCss[aCssPrefixes[i]+'transform']='';
								//if(bIsTransform)oCss[aCssPrefixes[i]+'transform']='';
							}
							oCss[prop]=propValue;
							//Restoring real css value to let the system make the correct math
							jElement.css(oCss);
						}
					}
				}
	}
})(jQuery);
