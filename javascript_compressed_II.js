"use strict";goog.provide("Blockly.JavaScript.texts"),goog.require("Blockly.JavaScript"),Blockly.JavaScript.text=function(t){return[Blockly.JavaScript.quote_(t.getFieldValue("TEXT")),Blockly.JavaScript.ORDER_ATOMIC]},Blockly.JavaScript.text_multiline=function(t){var a=Blockly.JavaScript.multiline_quote_(t.getFieldValue("TEXT")),t=-1!=a.indexOf("+")?Blockly.JavaScript.ORDER_ADDITION:Blockly.JavaScript.ORDER_ATOMIC;return[a,t]},Blockly.JavaScript.text.forceString_=function(t){return Blockly.JavaScript.text.forceString_.strRegExp.test(t)?[t,Blockly.JavaScript.ORDER_ATOMIC]:["String("+t+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text.forceString_.strRegExp=/^\s*'([^']|\\')*'\s*$/,Blockly.JavaScript.text_join=function(t){switch(t.itemCount_){case 0:return["''",Blockly.JavaScript.ORDER_ATOMIC];case 1:var a=Blockly.JavaScript.valueToCode(t,"ADD0",Blockly.JavaScript.ORDER_NONE)||"''";return Blockly.JavaScript.text.forceString_(a);case 2:var l=Blockly.JavaScript.valueToCode(t,"ADD0",Blockly.JavaScript.ORDER_NONE)||"''",a=Blockly.JavaScript.valueToCode(t,"ADD1",Blockly.JavaScript.ORDER_NONE)||"''";return[Blockly.JavaScript.text.forceString_(l)[0]+" + "+Blockly.JavaScript.text.forceString_(a)[0],Blockly.JavaScript.ORDER_ADDITION];default:for(var e=new Array(t.itemCount_),c=0;c<t.itemCount_;c++)e[c]=Blockly.JavaScript.valueToCode(t,"ADD"+c,Blockly.JavaScript.ORDER_NONE)||"''";return["["+e.join(",")+"].join('')",Blockly.JavaScript.ORDER_FUNCTION_CALL]}},Blockly.JavaScript.text_append=function(t){var a=Blockly.JavaScript.nameDB_.getName(t.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),t=Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''";return a+" += "+Blockly.JavaScript.text.forceString_(t)[0]+";\n"},Blockly.JavaScript.text_length=function(t){return[(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"''")+".length",Blockly.JavaScript.ORDER_MEMBER]},Blockly.JavaScript.text_isEmpty=function(t){return["!"+(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"''")+".length",Blockly.JavaScript.ORDER_LOGICAL_NOT]},Blockly.JavaScript.text_indexOf=function(t){var a="FIRST"==t.getFieldValue("END")?"indexOf":"lastIndexOf",l=Blockly.JavaScript.valueToCode(t,"FIND",Blockly.JavaScript.ORDER_NONE)||"''",l=(Blockly.JavaScript.valueToCode(t,"VALUE",Blockly.JavaScript.ORDER_MEMBER)||"''")+"."+a+"("+l+")";return t.workspace.options.oneBasedIndex?[l+" + 1",Blockly.JavaScript.ORDER_ADDITION]:[l,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_charAt=function(t){var a=t.getFieldValue("WHERE")||"FROM_START",l="RANDOM"==a?Blockly.JavaScript.ORDER_NONE:Blockly.JavaScript.ORDER_MEMBER,e=Blockly.JavaScript.valueToCode(t,"VALUE",l)||"''";switch(a){case"FIRST":return[e+".charAt(0)",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"LAST":return[e+".slice(-1)",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"FROM_START":return[e+".charAt("+Blockly.JavaScript.getAdjusted(t,"AT")+")",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"FROM_END":return[e+".slice("+Blockly.JavaScript.getAdjusted(t,"AT",1,!0)+").charAt(0)",Blockly.JavaScript.ORDER_FUNCTION_CALL];case"RANDOM":return[Blockly.JavaScript.provideFunction_("textRandomLetter",["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(text) {","  var x = Math.floor(Math.random() * text.length);","  return text[x];","}"])+"("+e+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]}throw Error("Unhandled option (text_charAt).")},Blockly.JavaScript.text.getIndex_=function(t,a,l){return"FIRST"==a?"0":"FROM_END"==a?t+".length - 1 - "+l:"LAST"==a?t+".length - 1":l},Blockly.JavaScript.text_getSubstring=function(t){var a=t.getFieldValue("WHERE1"),l=t.getFieldValue("WHERE2"),e="FROM_END"!=a&&"LAST"!=a&&"FROM_END"!=l&&"LAST"!=l,c=e?Blockly.JavaScript.ORDER_MEMBER:Blockly.JavaScript.ORDER_NONE,r=Blockly.JavaScript.valueToCode(t,"STRING",c)||"''";if("FIRST"==a&&"LAST"==l)return[n=r,Blockly.JavaScript.ORDER_NONE];if(r.match(/^'?\w+'?$/)||e){switch(a){case"FROM_START":var o=Blockly.JavaScript.getAdjusted(t,"AT1");break;case"FROM_END":o=r+".length - "+(o=Blockly.JavaScript.getAdjusted(t,"AT1",1,!1,Blockly.JavaScript.ORDER_SUBTRACTION));break;case"FIRST":o="0";break;default:throw Error("Unhandled option (text_getSubstring).")}switch(l){case"FROM_START":var i=Blockly.JavaScript.getAdjusted(t,"AT2",1);break;case"FROM_END":i=r+".length - "+(i=Blockly.JavaScript.getAdjusted(t,"AT2",0,!1,Blockly.JavaScript.ORDER_SUBTRACTION));break;case"LAST":i=r+".length";break;default:throw Error("Unhandled option (text_getSubstring).")}n=r+".slice("+o+", "+i+")"}else var o=Blockly.JavaScript.getAdjusted(t,"AT1"),i=Blockly.JavaScript.getAdjusted(t,"AT2"),c=Blockly.JavaScript.text.getIndex_,e={FIRST:"First",LAST:"Last",FROM_START:"FromStart",FROM_END:"FromEnd"},n=Blockly.JavaScript.provideFunction_("subsequence"+e[a]+e[l],["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(sequence"+("FROM_END"==a||"FROM_START"==a?", at1":"")+("FROM_END"==l||"FROM_START"==l?", at2":"")+") {","  var start = "+c("sequence",a,"at1")+";","  var end = "+c("sequence",l,"at2")+" + 1;","  return sequence.slice(start, end);","}"])+"("+r+("FROM_END"==a||"FROM_START"==a?", "+o:"")+("FROM_END"==l||"FROM_START"==l?", "+i:"")+")";return[n,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_changeCase=function(t){var a={UPPERCASE:".toUpperCase()",LOWERCASE:".toLowerCase()",TITLECASE:null}[t.getFieldValue("CASE")],l=a?Blockly.JavaScript.ORDER_MEMBER:Blockly.JavaScript.ORDER_NONE,l=Blockly.JavaScript.valueToCode(t,"TEXT",l)||"''";return[a?l+a:Blockly.JavaScript.provideFunction_("textToTitleCase",["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(str) {","  return str.replace(/\\S+/g,","      function(txt) {return txt[0].toUpperCase() + txt.substring(1).toLowerCase();});","}"])+"("+l+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_trim=function(t){var a={LEFT:".replace(/^[\\s\\xa0]+/, '')",RIGHT:".replace(/[\\s\\xa0]+$/, '')",BOTH:".trim()"}[t.getFieldValue("MODE")];return[(Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_MEMBER)||"''")+a,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_print=function(t){return"window.alert("+(Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''")+");\n"},Blockly.JavaScript.text_prompt_ext=function(t){var a="window.prompt("+(t.getField("TEXT")?Blockly.JavaScript.quote_(t.getFieldValue("TEXT")):Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''")+")";return"NUMBER"==t.getFieldValue("TYPE")&&(a="Number("+a+")"),[a,Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_prompt=Blockly.JavaScript.text_prompt_ext,Blockly.JavaScript.text_count=function(t){var a=Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''",t=Blockly.JavaScript.valueToCode(t,"SUB",Blockly.JavaScript.ORDER_NONE)||"''";return[Blockly.JavaScript.provideFunction_("textCount",["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(haystack, needle) {","  if (needle.length === 0) {","    return haystack.length + 1;","  } else {","    return haystack.split(needle).length - 1;","  }","}"])+"("+a+", "+t+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_replace=function(t){var a=Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''",l=Blockly.JavaScript.valueToCode(t,"FROM",Blockly.JavaScript.ORDER_NONE)||"''",t=Blockly.JavaScript.valueToCode(t,"TO",Blockly.JavaScript.ORDER_NONE)||"''";return[Blockly.JavaScript.provideFunction_("textReplace",["function "+Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_+"(haystack, needle, replacement) {",'  needle = needle.replace(/([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])/g,"\\\\$1")','                 .replace(/\\x08/g,"\\\\x08");',"  return haystack.replace(new RegExp(needle, 'g'), replacement);","}"])+"("+a+", "+l+", "+t+")",Blockly.JavaScript.ORDER_FUNCTION_CALL]},Blockly.JavaScript.text_reverse=function(t){return[(Blockly.JavaScript.valueToCode(t,"TEXT",Blockly.JavaScript.ORDER_MEMBER)||"''")+".split('').reverse().join('')",Blockly.JavaScript.ORDER_FUNCTION_CALL]};