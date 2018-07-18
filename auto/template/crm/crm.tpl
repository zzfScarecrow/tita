{%extends file="new_common/page/layout/base.tpl"%}
  
{%block name="requireSrc"%}
  {%require name="newretail_market:dist/static/vendor.js"%}
{%/block%}
{%block name="container"%}
	<div id="app"></div>
	<style>
	#app{
		background-color: #fff;
	}
	</style>
{%script%}
		window.new_shop_user = {%json_encode($new_shop_user)%}
    require("newretail_market:dist/static/widget.<$=tplName$>.js")
{%/script%}
{%/block%}
	