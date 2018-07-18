
{%extends file="newretail_common/page/layout.tpl"%}
  
{%block name="top-head-extend"%}
{%require name="newretail_market:dist/static/vendor.js"%}
{%/block%}
{%block name="page-main"%}
<section>
<div id="app"></div>
</section>
{%script%}
console.warn('user_info:', {%json_encode($user_info)%})
window.userInfo = {%json_encode($user_info)%}
require("newretail_market:dist/static/widget.<$=tplName$>.js");
{%/script%}
{%/block%}
	